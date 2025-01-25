from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


class BaseClass(BaseModel):
    """this class is a base for other classes"""

    model_config = ConfigDict(from_attributes=True)


class CreateSensorSchema(BaseModel):
    name: str
    description: str | None
    min_value: int
    max_value: int


class SensorData(BaseModel):
    temperature: float
    humidity: float
    soil_moisture: float
    light: float


class UserQuery(BaseModel):
    query: str


# Pydantic Schemas
class SensorSchema(BaseModel):
    id: int
    name: str
    description: str
    min_value: int
    max_value: int
    created_at: datetime

    class Config:
        orm_mode = True


class MessageSchema(BaseModel):
    id: int
    name: str
    message: str
    timestamp: datetime | None
    created_at: datetime
    sensor_id: int

    class Config:
        orm_mode = True


class CreateMessageSchema(BaseModel):
    name: str
    message: str
    timestamp: datetime | None
    sensor_id: int


class ControllerSchema(BaseModel):
    id: int
    name: str
    description: str
    min_value: int
    max_value: int
    created_at: datetime

    class Config:
        orm_mode = True


class CreateControllerSchema(BaseModel):
    name: str
    description: str | None
    min_value: int
    max_value: int
