from sqlalchemy.orm import Session

from app.db import models, schemas
from app.utils.logger import function_debug


def get_sensors_data(db: Session):
    return db.query(models.Sensor).all()
