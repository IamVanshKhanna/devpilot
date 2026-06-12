"""AI review service — analyzes PR diffs using NVIDIA/OpenAI-compatible API."""
import os
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

    def __init__(self):
        self.api_key = os.getenv("NVIDIA_API_KEY") or os.getenv("OPENROUTER_API_KEY", "")
        self.base_url = os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")
        self.model = os.getenv("AI_MODEL", "deepseek-ai/deepseek-v4-pro")
        self.timeout = httpx.Timeout(30.0, connect=5.0)

    async def analyze_diff(self, diff: str, repo_config: Optional[dict] = None) -> list[dict]:
        """
        Analyze a PR diff using AI model.
        
        Returns a list of review comments with structure:
        {
            "file": str,
            "line": int,
            "severity": str (info/warning/error/critical),
            "category": str (bug/security/style/performance/best_practice),
            "message": str,
            "suggestion": str
        }
        """
        if not self.api_key:
            # No API key configured — return empty review
            return []

        if not diff or len(diff.strip()) < 10:
            # Empty or trivial diff
            return []

        # Truncate diff if too large (keep under 100KB for token limits)
        max_diff_size = 100_000
        if len(diff) > max_diff_size:
            diff = diff[:max_diff_size] + "\n\n... (diff truncated due to size)"

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": self.model,
                        "messages": [
                            {
                                "role": "system",
                                "content": self.REVIEW_PROMPT
                            },
                            {
                                "role": "user",
                                "content": f"Review this pull request diff:\n\n{diff}"
                            }
                        ],
                        "temperature": 0.3,
                        "max_tokens": 4096,
                    }
                )

                if response.status_code != 200:
                    # Log error but don't crash
                    return []

                result = response.json()
                content = result.get("choices", [{}])[0].get("message", {}).get("content", "")

                # Parse the AI response as JSON
                import json
                comments = []
                try:
                    # Try to extract JSON array from response
                    # AI might wrap it in markdown code blocks
                    content = content.strip()
                    if content.startswith("```"):
                        # Remove markdown code fences
                        lines = content.split("\n")
                        content = "\n".join([
                            line for line in lines
                            if not line.startswith("```")
                        ])
                    
                    comments = json.loads(content)
                    if not isinstance(comments, list):
                        comments = []
                except json.JSONDecodeError:
                    # If JSON parse fails, create a single info comment
                    comments = [{
                        "file": "unknown",
                        "line": 1,
                        "severity": "info",
                        "category": "general",
                        "message": content[:500],  # Truncate
                        "suggestion": ""
                    }]

                # Validate and clean up comments
                valid_comments = []
                for c in comments:
                    if not isinstance(c, dict):
                        continue
                    
                    comment = {
                        "file": str(c.get("file", "unknown")),
                        "line": int(c.get("line", 1)) if c.get("line") else 1,
                        "severity": c.get("severity", "info").lower(),
                        "category": c.get("category", "general").lower(),
                        "message": str(c.get("message", ""))[:1000],  # Cap length
                        "suggestion": str(c.get("suggestion", ""))[:500],
                    }
                    
                    # Only add comments with actual messages
                    if comment["message"]:
                        valid_comments.append(comment)

                return valid_comments

        except Exception:
            # Don't crash on network/AI errors
            return []

    def format_github_review(self, comments: list[dict], repo_full_name: str, pr_number: int) -> dict:
        """Format review comments for GitHub Review API."""
        review_comments = []
        for c in comments:
            review_comment = {
                "path": c["file"],
                "line": c["line"],
                "side": "RIGHT",
                "body": f"**{c['severity'].upper()}** [{c['category']}]\n\n"
                       f"{c['message']}\n\n"
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
