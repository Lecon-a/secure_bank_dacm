from app.core.exceptions import NotFoundException

from app.modules.audit.repositories.audit_log_repository import (
    AuditLogRepository,
)


class GetAuditLogHandler:

    def __init__(self):
        self.repository = AuditLogRepository()

    def handle(self, query):

        audit_log = self.repository.get_by_id(
            query.audit_log_id
        )

        if audit_log is None:
            raise NotFoundException(
                "Audit log not found."
            )

        return audit_log
