from sqlalchemy.orm import Session
from models.Databasemodels import User
from schemas.users import UserCreate
from datetime import datetime
import hashlib
from passlib.hash import bcrypt

def create_user(db: Session, user: UserCreate):
    hashed_password = bcrypt.hash(user.password)
    db_user = User(
        username=user.username,
        password=hashed_password,
        email=user.email,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_list(db: Session):
    return db.query(User).all()