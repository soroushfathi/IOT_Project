from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.db import crud, schemas
from app.db.schemas import Todo
from app.exceptions import TodoNotFoundError

router = APIRouter()
