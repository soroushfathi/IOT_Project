from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.db import crud, schemas
from app import exceptions
from app.utils.logger import logger
from app.config.llm import llm, prompt

router = APIRouter()


@router.post("/analyze/")
async def analyze_data(sensor_data: schemas.SensorData):
    try:
        formatted_prompt = prompt.format(
            temperature=sensor_data.temperature,
            humidity=sensor_data.humidity,
            soil_moisture=sensor_data.soil_moisture,
            light=sensor_data.light
        )
        response = llm(formatted_prompt)
        return {"insights": response}
    except Exception as e:
        raise exceptions.InternalServerError()


@router.post("/notify")
async def query_llm(user_query: schemas.UserQuery):
    try:
        formatted_prompt = prompt.format(
            temperature=18,
            humidity=60,
            soil_moisture=3.0,
            light=5.0
        )
        response = llm(formatted_prompt)
        return {"response": response}
    except Exception as e:
        logger.exception(e)
        raise exceptions.InternalServerError()