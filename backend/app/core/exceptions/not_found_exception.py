from .base_exception import ApplicationException


class NotFoundException(ApplicationException):
    status_code = 404