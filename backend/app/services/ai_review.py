"""AI review service — analyzes PR diffs and generates review comments."""
from typing import Optional


class AIReviewService:
    """Service for analyzing code changes using AI models."""

    REVIEW_PROMPT = """You are an expert code reviewer. Analyze the following pull request diff and provide review comments.

For each issue found, provide:
1. The file path
2. The line number (approximate from diff context)
3. Severity: info, warning, error, or critical
4. Category: bug, security, style, performance, or best_practice
5. A clear, concise message explaining the issue
6. A specific code suggestion to fix it (when applicable)

Focus on:
- Real bugs and logic errors (not style nitpicks)
- Security vulnerabilities
- Performance issues
- Code that violates common best practices
- Potential edge cases not handled

Do NOT comment on:
- Personal style preferences
- Naming conventions (unless truly confusing)
- Whitespace or formatting"""

    @staticmethod
    async def analyze_diff(
        diff: str,
        repo_config: Optional[dict] = None,
    ) -> list[dict]:
        """
        Analyze a PR diff and return structured review comments.
        
        In production, this sends the diff to an AI model (Claude/GPT-4/DeepSeek)
        and parses the structured response.
        """
        comments = []
        
        # Placeholder — in production, send to LLM API
        # For now, return the structure that the webhook handler expects
        
        return comments

    @staticmethod
    def format_github_review(comments: list[dict]) -> dict:
        """Format review comments for GitHub Review API."""
        review_comments = []
        for c in comments:
            review_comments.append({
                "path": c["file"],
                "line": c.get("line", 1),
                "side": "RIGHT",
                "body": f"**{c.get('severity', 'info').upper()}** [{c.get('category', 'general')}]\n\n"
                       f"{c.get('message', '')}\n\n"
                       f"```suggestion\n{c.get('suggestion', '')}\n```\n\n"
                       f"---\n🤖 **DevPilot** — AI Code Review",
            })
        
        return {
            "body": f"DevPilot reviewed this PR and found {len(comments)} issue(s).",
            "event": "COMMENT",
            "comments": review_comments,
        }