from datetime import datetime

from fastapi import APIRouter, Depends, WebSocket
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.db import models, schemas

router = APIRouter()


@router.get("/sensors", response_model=list[schemas.SensorSchema])
def get_all_sensors(db: Session = Depends(get_db)):
    sensors = db.query(models.Sensor).all()
    return sensors


@router.post("/sensors", response_model=schemas.SensorSchema)
def create_sensor(sensor: schemas.CreateSensorSchema, db: Session = Depends(get_db)):
    new_sensor = models.Sensor(
        name=sensor.name,
        description=sensor.description,
        min_value=sensor.min_value,
        max_value=sensor.max_value
    )
    db.add(new_sensor)
    db.commit()
    db.refresh(new_sensor)
    return new_sensor


@router.get("/controllers", response_model=list[schemas.SensorSchema])
def get_all_controllers(db: Session = Depends(get_db)):
    controllers = db.query(models.Sensor).all()
    return controllers


@router.get("/sensor_data/{sensor_id}", response_model=list[schemas.MessageSchema])
def get_sensor_data(sensor_id: int, db: Session = Depends(get_db)):
    sensor = db.query(models.Sensor).filter(models.Sensor.id == sensor_id).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")
    messages = db.query(models.Message).filter(models.Message.sensor_id == sensor_id).all()
    return messages


@router.put("/message", response_model=schemas.MessageSchema)
def put_message(message: schemas.CreateMessageSchema, db: Session = Depends(get_db)):
    sensor = db.query(models.Sensor).filter(models.Sensor.id == message.sensor_id).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    new_message = models.Message(
        name=message.name,
        message=message.message,
        timestamp=message.timestamp,
        sensor_id=message.sensor_id
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


# 2. Get all controllers
# curl -X GET "https://iot.atenatech.ir/api/controllers" -H "accept: application/json"
