"""
logging handling module to create custom and particular loggers.
"""

import logging
from collections.abc import Callable

from colorlog.formatter import ColoredFormatter
from uvicorn.logging import ColourizedFormatter

from app.config.settings import settings


class ColorfulFormatter(ColourizedFormatter, ColoredFormatter):
    pass


def get_logger(
    name: str = settings.app_name, log_level: str | None = settings.log_level
) -> logging.Logger:
    """
    get a logger object.

    Args:
        name (:obj:`str`, optional): Specify a name if you want
            to retrieve a logger.
        log_level (:obj:`str`, optional): Specify the log level
            for this particular logger.

    Returns:
        The logger.
    """

    # create logger
    logger = logging.getLogger(name=name)
    # set log level
    if log_level is not None:
        logger.setLevel(log_level)

    # set logger handler and formating
    handler = logging.StreamHandler()
    handler.setFormatter(
        ColorfulFormatter(fmt=settings.logging_format, style="{", use_colors=True)
    )
    logger.addHandler(handler)

    return logger


logger = get_logger()


def function_debug(func: Callable) -> Callable:
    def wrapper(*args, **kwargs) -> Callable:
        # log the call data
        logger.debug(
            f"function {func.__name__} called, arguments : {args},"
            "key-arguments : {kwargs}"
        )
        # call function with arguments
        return func(*args, **kwargs)

    return wrapper
