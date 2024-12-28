from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Magical Service"
    api_prefix: str = ""
    sentry_dsn_key: str
    database_type: str = "postgresql"
    database_password: str
    database_db: str
    database_user: str | None = "postgres"
    database_server: str | None = "localhost"
    database_location: str | None = None

    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] | None = None
    logging_format: str = (
        "{levelprefix} {asctime} - {light_yellow}{name}{reset} : {message}"
    )
    app_env: Literal["test", "prod", "develop"] = "develop"

    model_config = SettingsConfigDict(
        env_file=".env", case_sensitive=False, extra="allow"
    )

    def model_post_init(self, _: object) -> None:
        # set default log level based on app_env
        if self.log_level is None:
            match self.app_env:
                case "prod":
                    self.log_level = "WARNING"
                case "test":
                    self.log_level = "INFO"
                case _:
                    # develop -> debug
                    self.log_level = "DEBUG"


settings = Settings()  # type: ignore
