from typing import Optional

from app.extensions import db
from app.modules.identity.models.user import User

class UserRepository:
    """
    Handles all database operations related to User.
    """

    @staticmethod
    def create(user:User) -> User:
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def get_by_email(email: str) -> Optional[User]:
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_by_employee_id(employee_id: str) -> Optional[User]:
        return User.query.filter_by(employee_id=employee_id).first()

    @staticmethod
    def get_all():
        return User.query.order_by(User.created_at.desc()).all()

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def save():
        db.session.commit()

    @staticmethod
    def delete(user: User):
        db.session.delete(user)
        db.session.commit()