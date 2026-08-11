from datetime import datetime

from app.extensions import db


class TrustScore(db.Model):
    __tablename__ = "trust_scores"

    id = db.Column(
        db.UUID(as_uuid=True),
        primary_key=True,
    )

    user_id = db.Column(
        db.UUID(as_uuid=True),
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True,
        index=True,
    )

    score = db.Column(
        db.Float,
        nullable=False,
        default=100.0,
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    def __repr__(self):
        return f"<TrustScore user_id={self.user_id} score={self.score}>"