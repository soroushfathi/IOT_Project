# Microservice Template
this repository is the base template to create microservices or services.
if the service does not need the connection with database, use `no-database` branch

## Dependency Manager
install the `rye` python dependency and package manager from following link :
- https://rye.astral.sh/
- https://github.com/astral-sh/rye

## Configuration
follow these steps to initialize new (micro)service based on this template :
1. set the `SERVICE_NAME` in `./pyproject.toml` instead of `microservice-template`
2. set the `APP_NAME` in `./.env_sample`
3. set the default `app_name` in `./app/config/settings.py`
4. rename the endpoints file_name in `./app/api/endpoints/todos.py` and `./tests/api/test_todos.py`
5. change the endpoint routes in `./app/api/endpoints/todos.py` and also `./app/main.py`
6. change the database model in `./app/db/models.py`
7. recreate the database migrations in `./alembic/versions/` using alembic tool
8. set `SERVICE_PORT` in `./.env-sample` or `./.env` (to run with docker properly)


## pre-commit
to run pre-commit hooks, install the [pre-commit](https://pre-commit.com/#install) using your os package manager or using pip :
```bash
pip install pre-commit
```

then run following command in project directory :
```bash
pre-commit install
```
after that, all pre-commit hooks will run before any commit automatically.
