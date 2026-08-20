from sqlalchemy import func

from app.extensions import db

from app.modules.identity.models.user import User
from app.modules.identity.models.role import Role
from app.modules.identity.models.permission import Permission

from app.modules.audit.models.audit_log import AuditLog


class DashboardService:

    @staticmethod
    def get_summary():

        total_employees = (
            db.session.query(func.count(User.id)).scalar() or 0
        )

        active_employees = (
            db.session.query(func.count(User.id))
            .filter(User.account_status == "ACTIVE")
            .scalar()
            or 0
        )

        total_roles = (
            db.session.query(func.count(Role.id)).scalar() or 0
        )

        active_roles = (
            db.session.query(func.count(Role.id))
            .filter(Role.is_active.is_(True))
            .scalar()
            or 0
        )

        total_permissions = (
            db.session.query(func.count(Permission.id)).scalar() or 0
        )

        active_permissions = (
            db.session.query(func.count(Permission.id))
            .filter(Permission.is_active.is_(True))
            .scalar()
            or 0
        )

        approved_requests = (
            db.session.query(func.count(AuditLog.id))
            .filter(AuditLog.decision == "ALLOW")
            .scalar()
            or 0
        )

        denied_requests = (
            db.session.query(func.count(AuditLog.id))
            .filter(AuditLog.decision == "DENY")
            .scalar()
            or 0
        )

        step_up_requests = (
            db.session.query(func.count(AuditLog.id))
            .filter(AuditLog.decision == "STEP_UP")
            .scalar()
            or 0
        )

        review_requests = (
            db.session.query(func.count(AuditLog.id))
            .filter(AuditLog.decision == "REVIEW")
            .scalar()
            or 0
        )

        recent_logs = (
            db.session.query(AuditLog)
            .order_by(AuditLog.created_at.desc())
            .limit(10)
            .all()
        )

        recent_activity = [
            {
                "id": str(log.id),
                "actor_employee_id": log.actor_employee_id,
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
                "created_at": (
                    log.created_at.isoformat()
                    if log.created_at
                    else None
                ),
            }
            for log in recent_logs
        ]

        return {
            "employees": {
                "total": total_employees,
                "active": active_employees,
            },
            "roles": {
                "total": total_roles,
                "active": active_roles,
            },
            "permissions": {
                "total": total_permissions,
                "active": active_permissions,
            },
            "authorization": {
                "approved": approved_requests,
                "denied": denied_requests,
                "step_up": step_up_requests,
                "review": review_requests,
            },
            "recent_activity": recent_activity,
        }