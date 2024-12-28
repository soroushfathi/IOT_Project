from typing import Literal

from pydantic import BaseModel, ConfigDict


class BaseClass(BaseModel):
    """this class is a base for other classes"""

    model_config = ConfigDict(from_attributes=True)


class SensorData(BaseModel):
    temperature: float
    humidity: float
    soil_moisture: float
    light: float


class UserQuery(BaseModel):
    query: str

