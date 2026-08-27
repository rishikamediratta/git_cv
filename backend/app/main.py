from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.github import router as github_router
from app.routers.health import router as health_router

app = FastAPI(title="GitCV API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(github_router)
