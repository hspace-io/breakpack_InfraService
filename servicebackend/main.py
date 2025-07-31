from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service import routers

app = FastAPI(
    title="Wargame Backend API",
    description="Wargame 서버를 위한 백엔드 API 문서입니다.",
    version="1.0.0",
    docs_url="/docs",              # Swagger UI
    redoc_url="/redoc",            # ReDoc UI
    openapi_url="/openapi.json"    # OpenAPI Spec URL
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in routers:
    app.include_router(router)