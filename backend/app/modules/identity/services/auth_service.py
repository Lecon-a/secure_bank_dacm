from datetime import datetime, timezone

from flask_jwt_extended import create_access_token

from app.core.security import Security
from app.modules.identity.models.user import AccountStatus
from app.modules.identity.repositories.user_repository import (
    UserRepository,
)


class AuthenticationException(Exception):
    pass


class AuthService:

    @staticmethod
    def login(identifier, password):

        user = UserRepository.get_by_email(
            identifier
        )

        if user is None:
            user = UserRepository.get_by_employee_id(
                identifier
            )

        if user is None:
            raise AuthenticationException(
                "Invalid credentials."
            )

        if user.account_status != AccountStatus.ACTIVE:
            raise AuthenticationException(
                "Account is not active."
            )

        if not Security.verify_password(
            password,
            user.password_hash,
        ):
            user.failed_login_attempts += 1

            UserRepository.update(user)

            raise AuthenticationException(
                "Invalid credentials."
            )

        user.failed_login_attempts = 0
        user.last_login = datetime.now(timezone.utc)

        UserRepository.update(user)

        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={
                "employee_id": user.employee_id,
                "email": user.email,
            },
        )

        return user, access_token