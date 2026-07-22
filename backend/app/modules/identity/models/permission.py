from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy.orm import relationship

from .base_model import BaseModel


class Permission(BaseModel):
    """
    Represents a system permission.
    """

    __tablename__ = "permissions"

    permission_name = Column(
        String(100),
        nullable=False,
        unique=True,
    )

    permission_code = Column(
        String(100),
        nullable=False,
        unique=True,
        index=True,
    )

    resource = Column(
        String(100),
        nullable=False,
        index=True,
    )

    action = Column(
        String(50),
        nullable=False,
    )

    description = Column(
        String(255),
        nullable=True,
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    # Enable after RolePermission entity exists
    # role_permissions = relationship(
    #     "RolePermission",
    #     back_populates="permission",
    # )