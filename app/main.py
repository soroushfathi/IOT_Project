from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import TypedDict

import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import chat, sensors, raspberry
from app.config.settings import settings
from app.exceptions import BaseHTTPError
from app.utils.logger import get_logger


# initilize sentry on production
if settings.app_env != "develop":
    sentry_sdk.init(dsn=settings.sentry_dsn_key)

logger = get_logger(__name__)


class State(TypedDict):
    pass


# setup lifespan
@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[State]:
    # show some settings variables
    logger.debug(f"settings.log_level : {settings.log_level}")
    logger.debug(f'settings.logging_format : "{settings.logging_format}"')
    logger.debug(f"settings.app_env: {settings.app_env}")
    # NOTE: open dependencies
    yield {}
    # NOTE: close dependecies


app = FastAPI(title=settings.app_name, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix=settings.api_prefix + '/chat', tags=["chat"])
app.include_router(sensors.router, prefix=settings.api_prefix, tags=["sensor"])
app.include_router(raspberry.router, prefix=settings.api_prefix + '/raspberry', tags=["raspberry"])


# base http exception handler
@app.exception_handler(BaseHTTPError)
async def unicorn_exception_handler(_: Request, exc: BaseHTTPError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message},
    )


# override default fastapi validation exception handler
# error schema :  {"message":"error messagge."}
@app.exception_handler(RequestValidationError)
def validation_exception_handler(
    _: Request, exc: RequestValidationError
) -> JSONResponse:
    errors = exc.errors()
    if errors:
        error = errors[0]
        # missing field
        if error["type"] == "value_error.missing":
            error_message = str(error["loc"][1]) + " is required!"

        # json deccod error
        elif error["type"] in ("value_error.jsondecod", "json_invalid"):
            error_message = (
                "Your request is invalid. request body should be a valid json."
            )
        else:
            # others
            error_message = ""
            if isinstance(error["loc"][1], str):
                error_message = error["loc"][1] + " "
            error_message += error["msg"]
    else:
        error_message = "Your request is invalid. request body should be a valid json."

    # send json response exception
    return JSONResponse(
        status_code=422,
        content={"message": error_message},
    )
