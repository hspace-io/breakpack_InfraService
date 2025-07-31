from pydantic import BaseModel
from datetime import datetime

class InstanceBase(BaseModel):
    name: str
    port: int

class InstanceCreate(InstanceBase):
    pass

class InstanceOut(InstanceBase):
    id: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True