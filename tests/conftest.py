from dotenv import load_dotenv

# NOTE: should be at top of file to override the .env variables for testing
load_dotenv("tests/test.env", override=True)


from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.database import Base
from app.main import app


@pytest.fixture(name="session")
def db() -> Generator[Session, None, None]:
    # create a on-memory mock database session

    sqlalchemy_database_url = "sqlite://"

    engine = create_engine(
        sqlalchemy_database_url,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)  # noqa : N806

    Base.metadata.create_all(bind=engine)

    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c
