"""DevPilot API — AI-Powered Code Review Agent"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import webhooks, repos, billing, auth

app = FastAPI(
    title="DevPilot API",
    description="AI-powered code review agent for GitHub",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://devpilot.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(webhooks.router, prefix="/api/webhook", tags=["webhooks"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(repos.router, prefix="/api/repos", tags=["repos"])
app.include_router(billing.router, prefix="/api/billing", tags=["billing"])


@app.get("/")
async def root():
    return {"name": "DevPilot API", "version": "0.1.0", "status": "operational"}


@app.get("/health")
async def health():
    return {"status": "healthy"}