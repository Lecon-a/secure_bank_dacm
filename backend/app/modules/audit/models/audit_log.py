"""
Audit Log Entity

Records administrative activities and authorization decisions
within the banking system.
"""

from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import UUID

from app.extensions import db
from app.modules.identity.models.base import BaseModel


class AuditLog(BaseModel):
    """
    Immutable audit event.

    Records who performed an action, what resource was involved,
    what decision was made, and when the event occurred.
    """

    __tablename__ = "audit_logs"

    # ==========================================================
    # ACTOR
    # ==========================================================

    actor_user_id = db.Column(
        UUID(as_uuid=True),
        nullable=True,
        index=True,
    )

    actor_employee_id = db.Column(
        String(50),
        nullable=True,
        index=True,
    )

    # ==========================================================
    # EVENT
    # ==========================================================

    event_type = db.Column(
        String(50),
        nullable=False,
        index=True,
    )

    action = db.Column(
        String(100),
        nullable=False,
        index=True,
    )

    # ==========================================================
    # RESOURCE
    # ==========================================================

    resource = db.Column(
        String(100),
        nullable=True,
        index=True,
    )

    resource_id = db.Column(
        UUID(as_uuid=True),
        nullable=True,
        index=True,
    )

    # ==========================================================
    # AUTHORIZATION DECISION
    # ==========================================================

    decision = db.Column(
        String(20),
        nullable=True,
        index=True,
    )

    reason = db.Column(
        Text,
        nullable=True,
    )

    # ==========================================================
    # REQUEST INFORMATION
    # ==========================================================

    request_method = db.Column(
        String(10),
        nullable=True,
    )

    request_path = db.Column(
        String(500),
        nullable=True,
    )

    ip_address = db.Column(
        String(100),
        nullable=True,
    )

    user_agent = db.Column(
        Text,
        nullable=True,
    )

    # ==========================================================
    # ADDITIONAL DATA
    # ==========================================================

    event_metadata = db.Column(
        JSON,
        nullable=True,
    )

    def __repr__(self):

        return (
            f"<AuditLog("
            f"event_type='{self.event_type}', "
            f"action='{self.action}', "
            f"decision='{self.decision}')>"
        )