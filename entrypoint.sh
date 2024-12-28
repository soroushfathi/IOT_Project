#!/bin/bash
# set the SERVICE_PORT in docker-compose.yml or .env that loaded in docker-compose
fastapi run ./app/main.py --host 0.0.0.0 --port $SERVICE_PORT
