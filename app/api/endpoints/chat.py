from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.db import crud, schemas
from app import exceptions
from app.utils.logger import logger
from app.config.llm import llm, prompt

router = APIRouter()


@router.post("/notify")
async def query_llm(
    user_query: schemas.UserQuery,
    db: Session = Depends(deps.get_db)
):
    sensors = crud.get_sensors_data(db)
    data = [str(schemas.SensorData.model_validate(sensor).model_dump()) for sensor in sensors]
    logger.info(f"sensors data: {data}")
    try:
        formatted_prompt = prompt.format(
            data="\n".join(data),
            query=user_query.query
        )
        response = llm(formatted_prompt)
        return {"response": response}
    except Exception as e:
        logger.exception(e)
        raise exceptions.InternalServerError()