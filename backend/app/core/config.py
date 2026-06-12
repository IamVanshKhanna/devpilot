"""Application settings from environment variables."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "DevPilot"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql://devpilot:***@postgres:5432/devpilot"

    # Redis
    REDIS_URL: str = "redis://redis:6379"

    # GitHub App
    GITHUB_APP_ID: str = ""
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    GITHUB_PRIVATE_KEY: str = ""
    GITHUB_WEBHOOK_SECRET: str = ""

    # AI / LLM
    OPENROUTER_API_KEY: str = ""
    NVIDIA_API_KEY: str = ""

    # Stripe
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # Email
    RESEND_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
