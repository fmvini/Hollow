from fastapi import FastAPI
from app import config
from app.api.health import router

app = FastAPI(title = config.APP_NAME)
app.include_router(router, prefix='/health')
