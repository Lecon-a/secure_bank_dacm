from .base_exception import ApplicationException


class ConflictException(ApplicationException):
    status_code = 409