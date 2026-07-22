from flask import Blueprint, jsonify, request

from marshmallow import ValidationError

from app.schemas.user_schema import UserSchema
from app.services.user_service import UserService
from app.utils.api_response import ApiResponse


user_bp = Blueprint("users", __name__, url_prefix="/api/users")

schema = UserSchema()

@user_bp.route("/", methods=["POST"])
def create_user():
    
    try:
        data = schema.load(request.get_json())

        user = UserService.create_user(
            employee_id=data['employee_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password'],
            phone_number=data.get('phone_number')
        )

        return ApiResponse.success(
            message="User created successfully.", 
            data={
                "user_id": str(user.id)
                }, 
            status_code=201
            )   
    except ValueError as err:
        return ApiResponse.error(
            message=str(err), 
            status_code=409
            )

