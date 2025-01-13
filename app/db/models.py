from datetime import datetime, timezone
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Sensor(Base):
    __tablename__ = 'sensor'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[str]
    min_value: Mapped[int]
    max_value: Mapped[int]
    created_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.now())
    
    messages: Mapped["Message"] = relationship('Message', back_populates='sensor')


class Message(Base):
    __tablename__ = 'message'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    message: Mapped[str]
    timestamp: Mapped[timezone] = mapped_column(sa.TIMESTAMP, nullable=True)
    created_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.now())
    sensor_id: Mapped[int] = mapped_column(sa.ForeignKey('sensor.id'))
    
    sensor: Mapped["Sensor"] = relationship('Sensor', back_populates='messages')