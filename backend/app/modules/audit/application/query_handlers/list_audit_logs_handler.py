from app.modules.audit.repositories.audit_log_repository import (
    AuditLogRepository,
)


class ListAuditLogsHandler:

    def __init__(self):
        self.repository = AuditLogRepository()

    def handle(self, query):

        return self.repository.search(
            actor_user_id=query.actor_user_id,
            decision=query.decision,
            event_type=query.event_type,
            resource=query.resource,
            action=query.action,
            limit=query.limit,
        )
