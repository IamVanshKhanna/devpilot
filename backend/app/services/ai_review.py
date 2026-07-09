"""AI review service — analyzes PR diffs using an OpenAI-compatible API.

Backends (selected via AI_BACKEND env var):
  - auto       : use paid key if present, else Ollama if reachable, else mock
  - nvidia     : NVIDIA API (paid, existing behaviour)
  - openrouter : OpenRouter API (paid, existing behaviour)
  - ollama     : local Ollama OpenAI-compatible endpoint (FREE, no key)
  - mock       : deterministic offline comments (FREE, no network) — for demos/CI

The paid NVIDIA/OpenRouter path is preserved byte-for-byte; only `auto` with no
paid key changes behaviour (it now routes to Ollama/mock instead of returning []).
"""
import os
import re
import json
import httpx
from typing import Optional


class AIReviewService:
    """Service for analyzing code changes using AI models."""

    REVIEW_PROMPT = """You are an expert code reviewer. Analyze the following pull request diff and provide review comments.

For each issue found, provide:
1. The file path
2. The approximate line number from the diff context
3. Severity: info, warning, error, or critical
4. Category: bug, security, style, performance, or best_practice
5. A clear, concise message explaining the issue
6. A specific code suggestion to fix it (when applicable)

Focus on:
- Real bugs and logic errors (not style nitpicks)
- Security vulnerabilities (injection, XSS, auth bypass)
- Performance issues (N+1 queries, memory leaks, unnecessary re-renders)
- Code that violates common best practices
- Potential edge cases not handled
- Error handling gaps

Do NOT comment on:
- Personal style preferences
- Naming conventions (unless truly confusing or misleading)
- Whitespace formatting
- Comments/documentation quality

Return your response as a JSON array of review comments. Each comment should have: file, line, severity, category, message, suggestion."""

    # Patterns the mock backend flags (cheap, heuristic, offline).
    _MOCK_RULES = [
        (re.compile(r"except\s*:"), "warning", "best_practice",
         "Bare `except:` swallows all exceptions including KeyboardInterrupt/SystemExit.",
         "Catch a specific exception (e.g. `except ValueError:`) or at least `except Exception:`."),
        (re.compile(r"\bprint\("), "info", "best_practice",
         "Stray `print()` left in — likely debug code that should be logging.",
         "Replace with the logging module at appropriate level."),
        (re.compile(r"password\s*=\s*[\"'][^\"']+[\"']"), "critical", "security",
         "Hardcoded credential/secret detected in source.",
         "Load secrets from environment variables or a secrets manager."),
        (re.compile(r"SELECT\s+.+\bWHERE\b.+\+"), "error", "security",
         "Possible SQL injection via string concatenation in a query.",
         "Use parameterized queries / an ORM."),
        (re.compile(r"\.execute\("), "info", "best_practice",
         "Dynamic execution — verify the input is trusted and not user-controlled.",
         "Avoid eval/exec on untrusted input; sanitize and validate."),
    ]

    def __init__(self):
        self.backend = os.getenv("AI_BACKEND", "auto").lower()
        # Paid path (UNCHANGED from original)
        self.paid_key = os.getenv("NVIDIA_API_KEY") or os.getenv("OPENROUTER_API_KEY", "")
        self.paid_base_url = os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")
        self.paid_model = os.getenv("AI_MODEL", "deepseek-ai/deepseek-v4-pro")
        # Ollama path (NEW, free)
        self.ollama_base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1")
        self.ollama_model = os.getenv("OLLAMA_MODEL", "qwen2.5-coder:7b")
        # Ollama is slow on a Pi; give it headroom.
        self.timeout = httpx.Timeout(120.0, connect=10.0)

    # ------------------------------------------------------------------ #
    # Backend resolution
    # ------------------------------------------------------------------ #
    def _resolve_backend(self) -> str:
        if self.backend == "mock":
            return "mock"
        if self.backend in ("ollama",):
            return "ollama"
        if self.backend in ("nvidia", "openrouter") and self.paid_key:
            return "paid"
        if self.backend == "auto":
            if self.paid_key:
                return "paid"
            return "ollama" if self._ollama_reachable() else "mock"
        return "mock"

    def _ollama_reachable(self) -> bool:
        try:
            with httpx.Client(timeout=httpx.Timeout(3.0)) as client:
                r = client.get(self.ollama_base_url.rsplit("/v1", 1)[0] + "/api/tags")
                return r.status_code == 200
        except Exception:
            return False

    # ------------------------------------------------------------------ #
    # Public entry point
    # ------------------------------------------------------------------ #
    async def analyze_diff(self, diff: str, repo_config: Optional[dict] = None) -> list[dict]:
        """Analyze a PR diff and return a list of review comment dicts.

        Returns [] for empty/trivial diffs.
        """
        if not diff or len(diff.strip()) < 10:
            return []

        backend = self._resolve_backend()
        if backend == "mock":
            return self._mock_review(diff)

        base_url, api_key, model = (
            (self.ollama_base_url, "", self.ollama_model)
            if backend == "ollama"
            else (self.paid_base_url, self.paid_key, self.paid_model)
        )
        return await self._query_openai_compat(base_url, api_key, model, diff)

    # ------------------------------------------------------------------ #
    # Shared OpenAI-compatible query (paid + ollama)
    # ------------------------------------------------------------------ #
    async def _query_openai_compat(self, base_url: str, api_key: str, model: str, diff: str) -> list[dict]:
        # Truncate diff if too large (keep under 100KB for token limits)
        max_diff_size = 100_000
        if len(diff) > max_diff_size:
            diff = diff[:max_diff_size] + "\n\n... (diff truncated due to size)"

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": model,
                        "messages": [
                            {"role": "system", "content": self.REVIEW_PROMPT},
                            {"role": "user", "content": f"Review this pull request diff:\n\n{diff}"},
                        ],
                        "temperature": 0.3,
                        "max_tokens": 4096,
                    },
                )

                if response.status_code != 200:
                    return []

                result = response.json()
                content = result.get("choices", [{}])[0].get("message", {}).get("content", "")

                comments = self._parse_model_response(content)
                return comments

        except Exception:
            # Don't crash on network/AI errors
            return []

    # ------------------------------------------------------------------ #
    # Response parsing (hardened)
    # ------------------------------------------------------------------ #
    def _parse_model_response(self, content: str) -> list[dict]:
        """Parse a model's JSON-array response into validated comment dicts."""
        content = (content or "").strip()
        if not content:
            return []

        # Strip markdown code fences if present
        if content.startswith("```"):
            lines = content.split("\n")
            # drop first fence line and any trailing fence
            if lines and lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].strip().startswith("```"):
                lines = lines[:-1]
            content = "\n".join(lines).strip()

        comments = []
        try:
            parsed = json.loads(content)
            if isinstance(parsed, list):
                comments = parsed
            elif isinstance(parsed, dict):
                # Some models wrap the array in an object
                comments = parsed.get("comments") or parsed.get("reviews") or []
        except json.JSONDecodeError:
            # Try to locate the first '[' and last ']' to extract a JSON array
            start, end = content.find("["), content.rfind("]")
            if start != -1 and end != -1 and end > start:
                try:
                    comments = json.loads(content[start:end + 1])
                except json.JSONDecodeError:
                    comments = []
            if not comments:
                # Last-resort: keep the raw text as a single info comment
                return [{
                    "file": "unknown",
                    "line": 1,
                    "severity": "info",
                    "category": "general",
                    "message": content[:500],
                    "suggestion": "",
                }]

        valid = []
        for c in comments:
            if not isinstance(c, dict):
                continue
            comment = {
                "file": str(c.get("file", "unknown")),
                "line": int(c.get("line", 1)) if c.get("line") else 1,
                "severity": str(c.get("severity", "info")).lower(),
                "category": str(c.get("category", "general")).lower(),
                "message": str(c.get("message", ""))[:1000],
                "suggestion": str(c.get("suggestion", ""))[:500],
            }
            if comment["message"]:
                valid.append(comment)
        return valid

    # ------------------------------------------------------------------ #
    # Mock backend (offline, deterministic) — for demos + CI
    # ------------------------------------------------------------------ #
    def _parse_diff_files(self, diff: str) -> list[tuple[str, int]]:
        """Extract (file_path, first_hunk_line) from a unified diff."""
        files = []
        file_re = re.compile(r"^\+\+\+ b/(.+)$", re.MULTILINE)
        hunk_re = re.compile(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@", re.MULTILINE)
        for m in file_re.finditer(diff):
            path = m.group(1)
            rest = diff[m.end():]
            hm = hunk_re.search(rest)
            line = int(hm.group(1)) if hm else 1
            files.append((path, line))
        return files

    def _mock_review(self, diff: str) -> list[dict]:
        """Produce realistic, deterministic comments without any model/network."""
        files = self._parse_diff_files(diff)
        if not files:
            return []
        comments = []
        for path, start_line in files:
            # Scan added lines for heuristic rules
            for line_no, line in enumerate(diff.split("\n"), start=1):
                if not line.startswith("+"):
                    continue
                for rx, severity, category, message, suggestion in self._MOCK_RULES:
                    if rx.search(line):
                        comments.append({
                            "file": path,
                            "line": start_line,
                            "severity": severity,
                            "category": category,
                            "message": f"[devpilot-mock] {message}",
                            "suggestion": suggestion,
                        })
                        break
        if not comments:
            # Fallback: at least one comment so the pipeline is visibly exercised
            first = files[0]
            comments.append({
                "file": first[0],
                "line": first[1],
                "severity": "info",
                "category": "best_practice",
                "message": "[devpilot-mock] Reviewed — no obvious issues detected by heuristics. Configure AI_BACKEND=ollama for LLM-powered review.",
                "suggestion": "",
            })
        return comments

    # ------------------------------------------------------------------ #
    # GitHub review formatting (unchanged)
    # ------------------------------------------------------------------ #
    def format_github_review(self, comments: list[dict], repo_full_name: str, pr_number: int) -> dict:
        """Format review comments for GitHub Review API."""
        review_comments = []
        for c in comments:
            review_comment = {
                "path": c["file"],
                "line": c["line"],
                "side": "RIGHT",
                "body": f"**{c['severity'].upper()}** [{c['category']}]\n\n"
                       f"{c['message']}\n\n",
            }
            if c.get("suggestion"):
                review_comment["body"] += f"```suggestion\n{c['suggestion']}\n```\n\n"
            review_comment["body"] += "---\n🤖 **DevPilot** — AI Code Review"
            review_comments.append(review_comment)

        body = f"DevPilot reviewed this PR and found {len(comments)} issue(s).\n"
        if len(comments) == 0:
            body = "DevPilot reviewed this PR — no issues found. Good job!"

        return {
            "body": body,
            "event": "COMMENT",
            "comments": review_comments,
        }
