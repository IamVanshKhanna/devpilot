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
    GH_APP_ID: str = ""
    GH_CLIENT_ID: str = ""
    GH_CLIENT_SECRET: str = ""
    GH_PRIVATE_KEY: str = ""
    GH_WEBHOOK_SECRET: str = ""

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
