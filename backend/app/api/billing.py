"""Stripe billing routes."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/checkout")
async def create_checkout(plan: str = "starter", repo_count: int = 1):
    """Create Stripe checkout session."""
    # TODO: Create Stripe checkout with tier pricing
    prices = {
        "starter": 29,
        "pro": 59,
        "enterprise": 99,
    }
    amount = prices.get(plan, 29) * repo_count * 100  # cents
    return {
        "status": "created",
        "plan": plan,
        "repos": repo_count,
        "monthly_total": amount / 100,
    }


@router.post("/webhook")
async def stripe_webhook():
    """Receive Stripe webhook events."""
    # TODO: Verify Stripe signature
    # TODO: Handle checkout.completed, subscription.updated, etc.
    return {"status": "received"}