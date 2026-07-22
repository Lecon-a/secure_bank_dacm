from .base_exception import ApplicationException


class ValidationException(ApplicationException):
    status_code = 422