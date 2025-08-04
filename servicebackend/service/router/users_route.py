from fastapi import APIRouter, Depends, HTTPException, status, Body, Header, Response, Request, Query
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
def login(response: Response, user: UserLogin = Body(...), db: Session = Depends(get_db)):
    print(user.username+user.password)
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not bcrypt.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Unknown credential")

    access_token = create_access_token({"sub": db_user.username})
    refresh_token = create_refresh_token({"sub": db_user.username})

    db_user.refresh_token = refresh_token
    db.commit()

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,       # 배포 환경에서 True
        samesite="Strict",
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="Strict",
        path="/"
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/auth/token_refresh")
def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    user = db.query(User).filter(User.refresh_token == refresh_token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Refresh token not found in DB")

    payload = verify_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": user.username})
    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        secure=False,
        samesite="Strict",
        path="/"
    )
    return {"detail": "Access token refreshed"}
    
@router.post("/auth/verify")
def verify(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Access token missing in cookies")

    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"username": username, "auth_level": user.auth_level}

@router.get("/auth/check-username")
def check_username(username: str = Query(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if user:
        raise HTTPException(status_code=409, detail="Username already taken")
    return {"detail": "Username is available"}

@router.get("/auth/users")
def get_all_users(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Access token missing")

    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user or user.auth_level < 2:
        raise HTTPException(status_code=403, detail="Forbidden: insufficient privileges")

    users = db.query(User).all()
    return [{"id": u.id, "username": u.username, "email": u.email, "auth_level": u.auth_level} for u in users]

@router.put("/auth/update-user/{user_id}")
def update_user(
    user_id: int,
    request: Request,
    updated_data: dict = Body(...),
    db: Session = Depends(get_db)
):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Access token missing")

    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    username = payload.get("sub")
    requester = db.query(User).filter(User.username == username).first()
    if not requester or requester.auth_level < 2:
        raise HTTPException(status_code=403, detail="Forbidden: insufficient privileges")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if updated_data.get("delete") == True:
        db.delete(user)
        db.commit()
        return {"detail": "User deleted successfully"}

    user.username = updated_data.get("username", user.username)
    user.email = updated_data.get("email", user.email)
    user.auth_level = updated_data.get("auth_level", user.auth_level)

    db.commit()
    return {"detail": "User updated successfully"}

@router.post("/auth/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"detail": "Logged out successfully"}
