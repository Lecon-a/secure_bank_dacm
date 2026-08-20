from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)


class Security:

    @staticmethod
    def hash_password(password):
        return generate_password_hash(password)

    @staticmethod
    def verify_password(
        password,
        password_hash,
    ):
        return check_password_hash(
            password_hash,
            password,
        )