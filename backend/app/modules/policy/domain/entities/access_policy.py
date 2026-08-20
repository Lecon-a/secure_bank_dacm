from sqlalchemy import Boolean, Column, String, Text

from app.modules.identity.models.base import BaseModel


class AccessPolicy(BaseModel):

    __tablename__ = "access_policies"

    policy_name = Column(
        String(100),
        nullable=False,
        unique=True,
    )

    description = Column(
        Text,
        nullable=True,
    )

    resource_type = Column(
        String(100),
        nullable=True,
        index=True,
    )

    action = Column(
        String(50),
        nullable=True,
        index=True,
    )

    rule = Column(
        Text,
        nullable=True,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )