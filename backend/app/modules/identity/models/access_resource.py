from app.extensions import db
from .base import BaseModel


class AccessResource(BaseModel):
    __tablename__ = "access_resources"

    resource_type = db.Column(
        db.String(100),
        nullable=False,
        index=True,
    )

    resource_name = db.Column(
        db.String(150),
        nullable=False,
    )

    department = db.Column(
        db.String(100),
        nullable=True,
    )

    required_clearance = db.Column(
        db.Integer,
        nullable=False,
        default=1,
    )

    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True,
    )

    def __repr__(self):
        return (
            f"<AccessResource "
            f"id={self.id} "
            f"type={self.resource_type} "
            f"name={self.resource_name}>"
        )