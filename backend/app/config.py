from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Digital Empire"
    DATABASE_URL: str = "sqlite:///./empire.db"
    SECRET_KEY: str = "your-secret-key-change-this"
    GROQ_API_KEY: str = ""
    ADMIN_TOKEN: str = "fallback-token-12345"  # Add this line


    class Config:
        env_file = ".env"
        extra = "ignore"  # Add this line - allows extra fields in .env


settings = Settings()
