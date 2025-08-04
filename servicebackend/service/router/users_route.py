from fastapi import APIRouter, Depends, HTTPException, status, Body, Header
from sqlalchemy.orm import Session
from database.get_db import get_db
from schemas.users import UserCreate, UserOut, UserLogin
from crud import users_crud
from utils.auth import create_access_token, create_refresh_token, verify_token
from passlib.hash import bcrypt
from models.Databasemodels import User

router = APIRouter()

@router.post("/auth/", response_model=UserOut, summary="Create a new user")
def create_user(
    user: UserCreate = Body(...),
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    try:
        return users_crud.create_user(db, user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/auth/login")
def login(user: UserLogin = Body(...), db: Session = Depends(get_db)):
    print(user.username+user.password)
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not bcrypt.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Unknown credential")

    access_token = create_access_token({"sub": db_user.username})
    refresh_token = create_refresh_token({"sub": db_user.username})

    db_user.refresh_token = refresh_token
    db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/auth/token_refresh")
def refresh_token(refresh_token: str = Body(...), db: Session = Depends(get_db)):
    # DB에서 토큰 검증
    user = db.query(User).filter(User.refresh_token == refresh_token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Refresh token not found in DB")

    # 토큰 구조와 서명 검증
    payload = verify_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": user.username})
    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }
    
@router.post("/auth/verify")
def verify(authorization: str = Header(...), db: Session = Depends(get_db)):
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    return {"username": username}