from http import HTTPStatus

from flask import Blueprint, request

from app.modules.identity.services.auth_service import (
    AuthService,
    AuthenticationException,
)
from app.utils.api_response import ApiResponse


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth",
)


@auth_bp.post("/login")
def login():

    data = request.get_json() or {}

    identifier = data.get("identifier")
    password = data.get("password")

    if not identifier or not password:
        return ApiResponse.error(
            message="Identifier and password are required.",
            status_code=HTTPStatus.BAD_REQUEST,
        )

    try:

        user, access_token = AuthService.login(
            identifier=identifier,
            password=password,
        )

        return ApiResponse.success(
            message="Login successful.",
            data={
                "access_token": access_token,
                "user": {
                    "id": str(user.id),
                    "employee_id": user.employee_id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "account_status": user.account_status.value,
                },
            },
            status_code=HTTPStatus.OK,
        )

    except AuthenticationException as err:

        return ApiResponse.error(
            message=str(err),
            status_code=HTTPStatus.UNAUTHORIZED,
        )