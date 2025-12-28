import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-key-123")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

settings = Settings()
