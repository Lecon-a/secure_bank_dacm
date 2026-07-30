from enum import Enum

from app.extensions import db
from .base import BaseModel


class AccountStatus(Enum):
    """Enumeration for user account status."""
    ACTIVE = "ACTIVE"
    LOCKED = "LOCKED"
    SUSPENDED = "SUSPENDED"
    DISABLED = "DISABLED"


class User(BaseModel):
    """
    User model representing a user in the system.

    Inherits from BaseModel to include common audit fields.
    """

    __tablename__ = "users"

    employee_id = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20))
    account_status = db.Column(
        db.Enum(AccountStatus, name="account_status_enum"),
        default=AccountStatus.ACTIVE,
        nullable=False
    )
    failed_login_attempts = db.Column(db.Integer, default=0, nullable=False)
    last_login = db.Column(db.DateTime)
    password_changed_at = db.Column(db.DateTime)


    user_roles = relationship(
        "UserRole",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<User {self.email}>"