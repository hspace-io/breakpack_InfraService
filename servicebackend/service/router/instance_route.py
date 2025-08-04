from fastapi import APIRouter, Depends, status, Body, HTTPException
from sqlalchemy.orm import Session
from crud import instance_crud
from database.get_db import get_db
from schemas.instance import InstanceCreate, InstanceOut
from typing import List
from core import core

router = APIRouter()


@router.post("/", response_model=InstanceOut, summary="Create and deploy a new service")
def create_instance(
    image: str = Body(..., description="Docker image name (must exist locally)"),
    service_name: str = Body(..., description="Name of the service and namespace to deploy to"),
    port: int = Body(..., description="NodePort to expose the service externally"),
    yaml: str = Body(..., description="Full YAML string to deploy to Kubernetes"),
    db: Session = Depends(get_db)
):
    try:
        instance_data = InstanceCreate(name=service_name, port=port)
        instance = instance_crud.create_instance(db, instance_data, yaml)
        return instance
    except HTTPException as http_exc:
        raise http_exc  # 다시 그대로 던짐
    except Exception as e:

        raise HTTPException(status_code=400, detail=f"unKnown failed: {str(e)}")

@router.get("/", response_model=List[InstanceOut])
def read_instances(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return instance_crud.get_instance_list(db, skip=skip, limit=limit)

@router.get("/{instance_id}", response_model=InstanceOut)
def read_instance(instance_id: str, db: Session = Depends(get_db)):
    return instance_crud.get_instance_or_404(db, instance_id)

@router.delete("/{instance_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_instance(instance_id: str, db: Session = Depends(get_db)):
    instance_crud.delete_instance_or_404(db, instance_id)

@router.patch("/{instance_id}/restart", response_model=InstanceOut)
def restart_instance(instance_id: str, db: Session = Depends(get_db)):
    return instance_crud.restart_instance_or_404(db, instance_id)

@router.get("/{instance_id}/stream")
def stream_instance(instance_id: str, db: Session = Depends(get_db)):
    instance = instance_crud.get_instance_or_404(db, instance_id)
    return instance_crud.stream_instance_video(instance.port)

@router.get("/{instance_id}/screenshot")
def screenshot_instance(instance_id: str, db: Session = Depends(get_db)):
    instance = instance_crud.get_instance_or_404(db, instance_id)
    return instance_crud.screenshot_instance(instance.port)