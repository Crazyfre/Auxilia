from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Auxilia API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/auxilia"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT
    SECRET_KEY: str = "your-super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # External APIs
    OPENWEATHER_API_KEY: str = ""
    TOMTOM_API_KEY: str = ""
    NEWS_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    
    # Blockchain
    BLOCKCHAIN_RPC_URL: str = "https://rpc-mumbai.maticvigil.com"
    CONTRACT_ADDRESS: str = ""
    WALLET_PRIVATE_KEY: str = ""
    
    # Trigger Thresholds
    RAIN_THRESHOLD_MM: float = 50.0
    TRAFFIC_THRESHOLD_PERCENT: float = 60.0
    SURGE_THRESHOLD_MULTIPLIER: float = 2.5
    ACCIDENT_THRESHOLD_COUNT: int = 3
    
    # Payout Amounts (INR)
    RAIN_PAYOUT: int = 150
    TRAFFIC_PAYOUT: int = 100
    SURGE_PAYOUT: int = 200
    ACCIDENT_PAYOUT: int = 500
    
    # Zone Configuration - Mumbai
    DEFAULT_CITY: str = "Mumbai"
    DEFAULT_COUNTRY: str = "IN"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
