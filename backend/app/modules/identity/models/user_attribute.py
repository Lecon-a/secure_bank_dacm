from app.extensions import db
from .base import BaseModel


class UserAttribute(BaseModel):
    __tablename__ = "user_attributes"

    user_id = db.Column(
        db.UUID(as_uuid=True),
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True,
        index=True,
    )

    department = db.Column(
        db.String(100),
        nullable=True,
    )

    clearance_level = db.Column(
        db.Integer,
        nullable=False,
        default=1,
    )

    employment_type = db.Column(
        db.String(50),
        nullable=True,
    )

    branch = db.Column(
        db.String(100),
        nullable=True,
    )

    def __repr__(self):
        return (
            f"<UserAttribute "
            f"user_id={self.user_id} "
            f"department={self.department} "
            f"clearance_level={self.clearance_level}>"
        )