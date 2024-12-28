from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.main import app


def test_create_todo(session: Session, client: TestClient):
    def get_db_override():
        return session

    # override db
    app.dependency_overrides[get_db] = get_db_override

    # send request to test client
    test_create_task = {"task": "test task", "status": "done"}
    response = client.post("/create", json=test_create_task)
    # clear mocked dependencies
    app.dependency_overrides.clear()

    # check data
    data = response.json()
    assert response.status_code == 200, response.text
    assert data["id"] is not None
    assert data["task"] == test_create_task["task"]
    assert data["status"] == test_create_task["status"]


def test_get_todo(session: Session, client: TestClient):
    def get_db_override():
        return session

    # override db
    app.dependency_overrides[get_db] = get_db_override

    # create a todo
    todo = {"task": "test task", "status": "done"}
    response = client.post("/create", json=todo)

    # get todo id
    data = response.json()
    assert response.status_code == 200, response.text
    assert data["id"] is not None
    todo_id: int = data["id"]

    # get todo with todo_id
    response = client.get(f"/{todo_id}")

    # clear mocked dependencies
    app.dependency_overrides.clear()

    # check data
    data = response.json()
    assert data["task"] == todo["task"]
    assert data["status"] == todo["status"]


def test_get_todos(session: Session, client: TestClient):
    def get_db_override():
        return session

    # override db
    app.dependency_overrides[get_db] = get_db_override

    # create some todos
    for _ in range(5):
        todo = {"task": "test task", "status": "done"}
        client.post("/create", json=todo)

    # get todos list
    response = client.get("/")

    # clear mocked dependencies
    app.dependency_overrides.clear()

    # check data
    data = response.json()
    assert len(data) == 5
