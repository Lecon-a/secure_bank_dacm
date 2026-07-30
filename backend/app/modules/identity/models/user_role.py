from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .base import BaseModel


class UserRole(BaseModel):
    """
    Associates users with roles.
    """

    __tablename__ = "user_roles"

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    role_id = Column(
        UUID(as_uuid=True),
        ForeignKey("roles.id"),
        nullable=False,
        index=True,
    )

    user = relationship(
        "User",
        back_populates="user_roles",
    )

    role = relationship(
        "Role",
        back_populates="user_roles",
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "role_id",
            name="uq_user_role",
        ),
    )