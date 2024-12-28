from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.db import crud, schemas


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
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/query/")
async def query_llm(user_query: schemas.UserQuery):
    try:
        response = llm(user_query.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))