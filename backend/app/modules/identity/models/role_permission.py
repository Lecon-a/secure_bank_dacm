from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .base import BaseModel


class RolePermission(BaseModel):
    """
    Associates roles with permissions.
    """

    __tablename__ = "role_permissions"

    role_id = Column(
        UUID(as_uuid=True),
        ForeignKey("roles.id"),
        nullable=False,
        index=True,
    )

    permission_id = Column(
        UUID(as_uuid=True),
        ForeignKey("permissions.id"),
        nullable=False,
        index=True,
    )

    role = relationship(
        "Role",
        back_populates="role_permissions",
    )

    permission = relationship(
        "Permission",
        back_populates="role_permissions",
    )

    __table_args__ = (
        UniqueConstraint(
            "role_id",
            "permission_id",
            name="uq_role_permission",
        ),
    )