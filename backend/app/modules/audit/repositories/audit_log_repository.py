from app.core.repositories.base_repository import BaseRepository

from app.modules.audit.models.audit_log import AuditLog


class AuditLogRepository(BaseRepository):

    def __init__(self):
        super().__init__(AuditLog)

    def get_recent(self, limit=50):

        return (
            AuditLog.query
            .order_by(
                AuditLog.created_at.desc()
            )
            .limit(limit)
            .all()
        )

    def get_by_id(self, audit_log_id):

        return (
            AuditLog.query
            .filter_by(
                id=audit_log_id
            )
            .first()
        )

    def get_by_actor(self, actor_user_id):

        return (
            AuditLog.query
            .filter_by(
                actor_user_id=actor_user_id
            )
            .order_by(
                AuditLog.created_at.desc()
            )
            .all()
        )

    def get_by_decision(self, decision):

        return (
            AuditLog.query
            .filter_by(
                decision=decision
            )
            .order_by(
                AuditLog.created_at.desc()
            )
            .all()
        )

    def get_by_event_type(self, event_type):

        return (
            AuditLog.query
            .filter_by(
                event_type=event_type
            )
            .order_by(
                AuditLog.created_at.desc()
            )
            .all()
        )

    def search(
        self,
        actor_user_id=None,
        decision=None,
        event_type=None,
        resource=None,
        action=None,
        limit=50,
    ):

        query = AuditLog.query

        if actor_user_id:
            query = query.filter(
                AuditLog.actor_user_id
                == actor_user_id
            )

        if decision:
            query = query.filter(
                AuditLog.decision
                == decision
            )

        if event_type:
            query = query.filter(
                AuditLog.event_type
                == event_type
            )

        if resource:
            query = query.filter(
                AuditLog.resource
                == resource
            )

        if action:
            query = query.filter(
                AuditLog.action
                == action
            )

        return (
            query
            .order_by(
                AuditLog.created_at.desc()
            )
            .limit(limit)
            .all()
        )