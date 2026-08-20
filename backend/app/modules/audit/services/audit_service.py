from app.modules.audit.models.audit_log import AuditLog
from app.modules.audit.repositories.audit_log_repository import (
    AuditLogRepository,
)


class AuditService:

    repository = AuditLogRepository()

    @classmethod
    def log(
        cls,
        *,
        event_type,
        action,
        actor_user_id=None,
        actor_employee_id=None,
        resource=None,
        resource_id=None,
        decision=None,
        reason=None,
        request_method=None,
        request_path=None,
        ip_address=None,
        user_agent=None,
        event_metadata=None,
    ):

        audit_log = AuditLog(
            actor_user_id=actor_user_id,
            actor_employee_id=actor_employee_id,
            event_type=event_type,
            action=action,
            resource=resource,
            resource_id=resource_id,
            decision=decision,
            reason=reason,
            request_method=request_method,
            request_path=request_path,
            ip_address=ip_address,
            user_agent=user_agent,
            event_metadata=event_metadata,
        )

        return cls.repository.create(
            audit_log
        )