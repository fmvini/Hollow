from fastapi import FastAPI
from app import config
from app.api.health import router as health_router 
from app.api.ws import router as ws_router

app = FastAPI(title = config.APP_NAME)
app.include_router(health_router, prefix='/health')
app.include_router(ws_router, prefix='/ws')
