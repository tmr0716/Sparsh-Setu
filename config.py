import os
from dotenv import load_dotenv

# Load environment variables from .env file if present
load_dotenv()


class Config:
    """Base Configuration Class for Sparsh Setu Application."""

    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'sparsh-setu-super-secret-key-2026-internship-key'

    # Application Settings
    APP_NAME = "Sparsh Setu"
    TAGLINE = "Empowering Children Through Technology & Education"
    
    # Static & Template Configuration
    TEMPLATES_AUTO_RELOAD = True
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload cap

    # Contact & NGO Meta Information
    NGO_EMAIL = "contact@sparshsetu.org"
    NGO_PHONE = "+91 98765 43210"
    NGO_ADDRESS = "123 Education Hub, Sector 15, Knowledge Park, New Delhi, India"
    
    # Chatbot Metadata
    BOT_NAME = "Sparsh Assist"
    
    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    """Development Environment Configuration."""
    DEBUG = True


class ProductionConfig(Config):
    """Production Environment Configuration."""
    DEBUG = False
    # In production, ensure SECRET_KEY is set via environment variable
    SECRET_KEY = os.environ.get('SECRET_KEY')


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}