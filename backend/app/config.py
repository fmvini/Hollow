import os

APP_NAME = os.getenv('APP_NAME', 'Hollow')

ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')

DEMO_MODE = os.getenv('DEMO_MODE', "false").lower() == 'true'

FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')