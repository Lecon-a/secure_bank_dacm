from uuid import UUID

from flask import Blueprint, request

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from app.utils.api_response import ApiResponse

from app.modules.identity.services.permission_service import (
    PermissionService,
)

from app.modules.audit.application.queries.list_audit_logs_query import (
    ListAuditLogsQuery,
)

from app.modules.audit.application.queries.get_audit_log_query import (
    GetAuditLogQuery,
)

from app.modules.audit.application.query_handlers.list_audit_logs_handler import (
    ListAuditLogsHandler,
)

from app.modules.audit.application.query_handlers.get_audit_log_handler import (
    GetAuditLogHandler,
)

from app.modules.audit.serializers import AuditSerializer


audit_bp = Blueprint(
    "audit",
    __name__,
    url_prefix="/api/v1/audit",
)


@audit_bp.get("")
@jwt_required()
def list_audit_logs():

    permission_error = require_audit_read_permission()

    if permission_error:
        return permission_error

    actor_user_id = request.args.get(
        "actor_user_id"
    )

    decision = request.args.get(
        "decision"
    )

    event_type = request.args.get(
        "event_type"
    )

    resource = request.args.get(
        "resource"
    )

    action = request.args.get(
        "action"
    )

    try:
        limit = int(
            request.args.get(
                "limit",
                50,
            )
        )
    except ValueError:
        limit = 50

    limit = max(
        1,
        min(limit, 200),
    )

    query = ListAuditLogsQuery(
        actor_user_id=(
            UUID(actor_user_id)
            if actor_user_id
            else None
        ),
        decision=decision,
        event_type=event_type,
        resource=resource,
        action=action,
        limit=limit,
    )

    logs = ListAuditLogsHandler().handle(
        query
    )

    return ApiResponse.success(
        message="Audit logs retrieved successfully.",
        data=AuditSerializer.audit_logs(
            logs
        ),
    )


@audit_bp.get("/<uuid:audit_log_id>")
@jwt_required()
def get_audit_log(audit_log_id):

    permission_error = require_audit_read_permission()

    if permission_error:
        return permission_error

    query = GetAuditLogQuery(
        audit_log_id=audit_log_id
    )

    audit_log = GetAuditLogHandler().handle(
        query
    )

    return ApiResponse.success(
        message="Audit log retrieved successfully.",
        data=AuditSerializer.audit_log(
            audit_log
        ),
    )


def require_audit_read_permission():
    authenticated_user_id = get_jwt_identity()

    if not PermissionService.has_permission(
        authenticated_user_id,
        "AUDIT_READ",
    ):
        return ApiResponse.error(
            message="You do not have permission to view audit logs.",
            status_code=403,
        )

    return None