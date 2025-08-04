from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from service import routers
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database.get_db import get_db
from utils.auth import verify_token
from models.Databasemodels import User

app = FastAPI(
    title="Wargame Backend API",
    description="Wargame 서버를 위한 백엔드 API 문서입니다.",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None
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

@app.get("/docs", include_in_schema=False)
def custom_swagger_ui(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Access token missing")

    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user or user.auth_level < 2:
        raise HTTPException(status_code=403, detail="Forbidden")

    return get_swagger_ui_html(openapi_url="/openapi.json", title="Protected Docs")

@app.get("/openapi.json", include_in_schema=False)
def get_open_api_endpoint(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Access token missing")

    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user or user.auth_level < 2:
        raise HTTPException(status_code=403, detail="Forbidden")

    return JSONResponse(app.openapi())

for router in routers:
    app.include_router(router)