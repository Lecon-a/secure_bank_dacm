from werkzeug.security import generate_password_hash

from app.models.user import User
from app.repositories.user_repository import UserRepository

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

        existing_user = UserRepository.get_by_email(email)

        if existing_user:
            raise ValueError("Email already exits.")

        user = User(
            employee_id=employee_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=generate_password_hash(password),
            phone_number=phone_number,
        )

        return UserRepository.create(user)