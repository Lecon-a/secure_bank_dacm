from http import HTTPStatus

from flask import Blueprint, request
from marshmallow import ValidationError

from app.modules.identity.schemas.user_schema import (
    UserCreateSchema,
    UserResponseSchema,
)
from app.modules.identity.services.user_service import UserService
from app.modules.identity.exceptions.user_exceptions import (
    UserAlreadyExistsException,
    UserNotFoundException,
)
from app.utils.api_response import ApiResponse


user_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/users",
)

create_schema = UserCreateSchema()
response_schema = UserResponseSchema()
response_list_schema = UserResponseSchema(many=True)


@user_bp.post("/")
def create_user():
    """
    Create a new user.
    """
    try:
        data = create_schema.load(request.get_json())

        user = UserService.create_user(
            employee_id=data["employee_id"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            password=data["password"],
            phone_number=data.get("phone_number"),
        )

        return ApiResponse.success(
            message="User created successfully.",
            data=response_schema.dump(user),
            status_code=HTTPStatus.CREATED,
        )

    except ValidationError as err:
        return ApiResponse.error(
            message="Validation failed.",
            errors=err.messages,
            status_code=HTTPStatus.BAD_REQUEST,
        )

    except UserAlreadyExistsException as err:
        return ApiResponse.error(
            message=str(err),
            status_code=HTTPStatus.CONFLICT,
        )


@user_bp.get("/")
def list_users():
    """
    Retrieve all users.
    """
    users = UserService.list_users()

    return ApiResponse.success(
        message="Users retrieved successfully.",
        data=response_list_schema.dump(users),
        status_code=HTTPStatus.OK,
    )


@user_bp.get("/<uuid:user_id>")
def get_user(user_id):
    """
    Retrieve a user by ID.
    """
    try:
        user = UserService.get_user(user_id)

        return ApiResponse.success(
            message="User retrieved successfully.",
            data=response_schema.dump(user),
            status_code=HTTPStatus.OK,
        )

    except UserNotFoundException as err:
        return ApiResponse.error(
            message=str(err),
            status_code=HTTPStatus.NOT_FOUND,
        )