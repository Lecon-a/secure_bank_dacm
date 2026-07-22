from app.core.security import Security
from app.modules.identity.models.user import User
from app.modules.identity.repositories.user_repository import UserRepository
from app.modules.identity.exceptions.user_exceptions import (
    UserAlreadyExistsException,
    UserNotFoundException
)


class UserService:

    @staticmethod
    def create_user(
        employee_id, 
        first_name, 
        last_name, 
        email, 
        password, 
        phone_number=None
        ):


        if UserRepository.get_by_email(email):
            raise UserAlreadyExistsException("A user with this email already exists.")

        if UserRepository.get_by_employee_id(employee_id):
            raise UserAlreadyExistsException("A user with this employee ID already exists.")
    
        user = User(
            employee_id=employee_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=Security.hash_password(password),
            phone_number=phone_number,
        )

        return UserRepository.create(user)


    @staticmethod
    def get_user(user_id):
        user = UserRepository.get_by_id(user_id)

        if not user:
            raise UserNotFoundException("User not found.")

        return user

    
    @staticmethod
    def list_users():
        return UserRepository.get_all()