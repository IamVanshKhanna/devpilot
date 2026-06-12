"""Billing endpoints with Stripe-compatible checkout."""
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

router = APIRouter()

PLANS = {
    "free": {"name": "Open Source", "price_monthly": 0.0},
    "pro": {"name": "Pro", "price_monthly": 59.0},
    "team": {"name": "Team", "price_monthly": 29.0},
    "enterprise": {"name": "Enterprise", "price_monthly": 99.0},
}


class CheckoutRequest(BaseModel):
    plan: str
    repo_count: int = 1


@router.post("/billing/checkout")
async def create_checkout(req: CheckoutRequest):
    """Create a Stripe checkout session.

    In production this hits Stripe. Here we return a check
    and the correct total for the selected plan.
    """
    plan = PLANS.get(req.plan)
    if req.plan not in PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan")

    base = plan["price_monthly"]
    multi = max(req.repo_count, 1)
    monthly_total = round(base * multi, 2)

    return {
        "plan": req.plan,
        "plan_name": plan["name"],
        "base_price": base,
        "repo_count": multi,
        "monthly_total": monthly_total,
        "currency": "usd",
        "status": "ready",
    }


@router.get("/billing/portal")
async def customer_portal():
    """Return a portal URL placeholder.

    Currently returns a demo portal URL. Replace with real Stripe
    billing portal session creation when secrets are available.
    """
    return {
        "portal_url": "#",
        "status": "ready",
    }
