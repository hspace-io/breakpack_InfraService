from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
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

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print(f"❌ Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()},
    )


for router in routers:
    app.include_router(router)