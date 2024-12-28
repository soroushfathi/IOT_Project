class BaseHTTPError(Exception):
    def __init__(self, status_code: int, message: str, *args: object) -> None:
        self.status_code = status_code
        self.message = message
        super().__init__(*args)

    def __str__(self) -> str:
        return f"status code : {self.status_code}, error message : {self.message}"


class InternalServerError(BaseHTTPError):
    def __init__(self, *args) -> None:
        "this is the base exception for internal server errors"
        super().__init__(500, "Internal Server Error!", *args)
