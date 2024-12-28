import logging
from urllib.parse import quote_plus

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config.settings import settings

database_type = settings.database_type
user = settings.database_user
password = quote_plus(settings.database_password)
server = settings.database_server
db = settings.database_db


# check database type
if database_type == "sqlite":
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{settings.database_location}"
else:
    SQLALCHEMY_DATABASE_URL = f"{database_type}://{user}:{password}@{server}/{db}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)


# set logger level
if settings.app_env == "prod":
    log_level = logging.WARNING
elif settings.app_env == "test":
    log_level = logging.INFO
else:
    log_level = logging.DEBUG

logging.basicConfig(level=log_level)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
