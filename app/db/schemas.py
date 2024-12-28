from typing import Literal

from pydantic import BaseModel, ConfigDict


class BaseClass(BaseModel):
    """this class is a base for other classes"""

    model_config = ConfigDict(from_attributes=True)


class TodoBase(BaseClass):
    task: str
    status: Literal["pending", "done"]


class TodoCreate(TodoBase):
    pass


class Todo(TodoBase):
    id: int
