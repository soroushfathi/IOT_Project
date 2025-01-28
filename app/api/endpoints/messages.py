from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.db.models import Message, Sensor
from app.db.schemas import MessageSchema, CreateMessageSchema
from app.utils.logger import logger

router = APIRouter()


@router.get("/", response_model=list[MessageSchema])
def get_all_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).all()
    return messages


@router.get("/{message_id}", response_model=MessageSchema)
def get_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.post("/", response_model=MessageSchema)
def create_message(message: CreateMessageSchema, db: Session = Depends(get_db)):
    sensor = db.query(Sensor).filter(Sensor.id == message.sensor_id).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    new_message = Message(
        value=message.value,
        timestamp=message.timestamp,
        sensor_id=message.sensor_id
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


@router.put("/{message_id}", response_model=MessageSchema)
def edit_message(message_id: int, updated_message: CreateMessageSchema, db: Session = Depends(get_db)):
    existing_message = db.query(Message).filter(Message.id == message_id).first()
    if not existing_message:
        raise HTTPException(status_code=404, detail="Message not found")

    existing_message.name = updated_message.name
    existing_message.message = updated_message.message
    existing_message.timestamp = updated_message.timestamp
    existing_message.sensor_id = updated_message.sensor_id

    db.commit()
    db.refresh(existing_message)
    return existing_message
