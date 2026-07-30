"""
Role Entity

Represents a business role within the banking system.
"""

import uuid

from sqlalchemy import Boolean
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.extensions import db
from .base import BaseModel


class Role(BaseModel):
    """
    Role entity.

    A role groups a collection of permissions that can be assigned
    to one or more users.
    """

    __tablename__ = "roles"

    role_name = db.Column(
        String(100),
        nullable=False,
    )

    role_code = db.Column(
        String(50),
        nullable=False,
        unique=True,
        index=True,
    )

    description = db.Column(
        Text,
        nullable=True,
    )

    is_system = db.Column(
        Boolean,
        nullable=False,
        default=False,
    )

    is_active = db.Column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_by = db.Column(
        UUID(as_uuid=True),
        nullable=True,
    )

    updated_by = db.Column(
        UUID(as_uuid=True),
        nullable=True,
    )

    user_roles = relationship(
        "UserRole",
        back_populates="role",
        cascade="all, delete-orphan",
    )

    role_permissions = relationship(
        "RolePermission",
        back_populates="role",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return (
            f"<Role("
            f"code='{self.role_code}', "
            f"name='{self.role_name}')>"
        )