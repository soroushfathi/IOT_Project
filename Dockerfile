FROM python:3.11-bullseye

WORKDIR /app/

COPY requirements.lock ./
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r requirements.lock

COPY . /app

ENTRYPOINT ["sh", "./entrypoint.sh"]
