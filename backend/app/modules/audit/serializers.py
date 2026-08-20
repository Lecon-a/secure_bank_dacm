class AuditSerializer:

    @staticmethod
    def audit_log(log):

        return {
            "id": str(log.id),

            "actor_user_id": (
                str(log.actor_user_id)
                if log.actor_user_id
                else None
            ),

            "actor_employee_id": (
                log.actor_employee_id
            ),

            "event_type": log.event_type,

            "action": log.action,

            "resource": log.resource,

            "resource_id": (
                str(log.resource_id)
                if log.resource_id
                else None
            ),

            "decision": log.decision,

            "reason": log.reason,

            "request_method": (
                log.request_method
            ),

            "request_path": (
                log.request_path
            ),

            "ip_address": log.ip_address,

            "user_agent": log.user_agent,

            "event_metadata": (
                log.event_metadata
            ),

            "created_at": (
                log.created_at.isoformat()
                if log.created_at
                else None
            ),

            "updated_at": (
                log.updated_at.isoformat()
                if log.updated_at
                else None
            ),
        }

    @staticmethod
    def audit_logs(logs):

        return [
            AuditSerializer.audit_log(log)
            for log in logs
        ]