from sqlalchemy.orm import Session
from models.Databasemodels import GameInstance
from schemas.instance import InstanceCreate
from fastapi import HTTPException, status
from datetime import datetime
import uuid
from core import core
from fastapi import HTTPException, status, Response
import traceback

def create_instance(db: Session, data: InstanceCreate, yaml_content: str) -> GameInstance:

    existing_conflict = db.query(GameInstance).filter(
        GameInstance.name == data.name,
        GameInstance.port == data.port
    ).first()
    if existing_conflict:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A service with the same namespace and port already exists"
        )

    name_exists = db.query(GameInstance).filter(GameInstance.name == data.name).first()
    port_exists = db.query(GameInstance).filter(GameInstance.port == data.port).first()

    if name_exists and port_exists and name_exists.id != port_exists.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A service with that namespace and port combination already exists"
        )

    try:
        core.deploy_yaml_to_kubernetes(yaml_content)
    except Exception as e:
        traceback.print_exc()  # This will log the full traceback to the console
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"YAML deployment failed: {str(e)}"
        )

    instance = GameInstance(
        id=str(uuid.uuid4()),
        name=data.name,
        port=data.port,
        status="running",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    print(f"📦 Incoming data: name={data.name}, port={data.port}")
    try:
        db.add(instance)
        db.commit()
        db.refresh(instance)
    except Exception as e:
        raise e
    
    return instance

def get_instance_list(db: Session, skip: int = 0, limit: int = 100):
    return db.query(GameInstance).offset(skip).limit(limit).all()

def get_instance_or_404(db: Session, instance_id: str) -> GameInstance:
    instance = db.query(GameInstance).filter(GameInstance.id == instance_id).first()
    if not instance:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instance not found")
    return instance

def delete_instance_or_404(db: Session, instance_id: str):
    instance = db.query(GameInstance).filter(GameInstance.id == instance_id).first()
    if not instance:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instance not found")
    db.delete(instance)
    db.commit()

def restart_instance_or_404(db: Session, instance_id: str) -> GameInstance:
    instance = db.query(GameInstance).filter(GameInstance.id == instance_id).first()
    if not instance:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instance not found")
    instance.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(instance)
    return instance


def screenshot_instance(port: int):
    image_bytes = core.get_screenshot_bytes(port)
    return Response(content=image_bytes, media_type="image/png")