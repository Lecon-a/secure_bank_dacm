from http import HTTPStatus
from enum import Enum

class HttpStatus(str, Enum):
    CREATED=201
    NOT_FOUND=404
    FORBIDDEN=403