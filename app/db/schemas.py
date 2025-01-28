from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


class BaseClass(BaseModel):
    """this class is a base for other classes"""

    model_config = ConfigDict(from_attributes=True)


class CreateSensorSchema(BaseModel):
    name: str
    description: str | None


class UserQuery(BaseModel):
    query: str


class SensorData(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    name: str 
    value: int | None


class SensorSchema(BaseModel):
    id: int
    name: str
    description: str
    created_at: datetime

    class Config:
        orm_mode = True


class MessageSchema(BaseModel):
    id: int
    value: int | None
    timestamp: datetime | None
    created_at: datetime
    sensor_id: int

    class Config:
        orm_mode = True


class CreateMessageSchema(BaseModel):
    value: int | None
    timestamp: datetime | None
    sensor_id: int


class ControllerSchema(BaseModel):
    id: int
    name: str
    description: str
    value: int | None
    min_value: int
    max_value: int
    created_at: datetime

    class Config:
        orm_mode = True


class CreateControllerSchema(BaseModel):
    name: str
    description: str | None
    value: int | None
    min_value: int
    max_value: int


class UpdateControllerSchema(BaseModel):
    name: str | None
    description: str | None
    value: int | None
    min_value: int | None
    max_value: int | None

