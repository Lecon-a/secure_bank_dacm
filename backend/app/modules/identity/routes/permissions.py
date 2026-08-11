from flask import Blueprint, request

from app.utils.api_response import ApiResponse
from app.core.serializers.serializer import Serializer

from app.modules.identity.application.commands.create_permission_command import (
    CreatePermissionCommand,
)
from app.modules.identity.application.commands.update_permission_command import (
    UpdatePermissionCommand,
)
from app.modules.identity.application.commands.deactivate_permission_command import (
    DeactivatePermissionCommand,
)

from app.modules.identity.application.command_handlers.create_permission_handler import (
    CreatePermissionHandler,
)
from app.modules.identity.application.command_handlers.update_permission_handler import (
    UpdatePermissionHandler,
)
from app.modules.identity.application.command_handlers.deactivate_permission_handler import (
    DeactivatePermissionHandler,
)

from app.modules.identity.application.queries.get_permission_query import (
    GetPermissionQuery,
)
from app.modules.identity.application.queries.list_permissions_query import (
    ListPermissionsQuery,
)
from app.modules.identity.application.queries.search_permissions_query import (
    SearchPermissionsQuery,
)

from app.modules.identity.application.query_handlers.get_permission_handler import (
    GetPermissionHandler,
)
from app.modules.identity.application.query_handlers.list_permissions_handler import (
    ListPermissionsHandler,
)
from app.modules.identity.application.query_handlers.search_permissions_handler import (
    SearchPermissionsHandler,
)

from app.modules.identity.schemas.permission_schema import (
    CreatePermissionSchema,
    UpdatePermissionSchema,
)


permission_bp = Blueprint(
    "permissions",
    __name__,
    url_prefix="/api/v1/permissions",
)


@permission_bp.post("")
def create_permission():
    data = CreatePermissionSchema().load(request.json)

    command = CreatePermissionCommand(**data)

    permission = CreatePermissionHandler().handle(command)

    return ApiResponse.success(
        message="Permission created successfully.",
        data=Serializer.permission(permission),
        status_code=201,
    )


@permission_bp.get("")
def list_permissions():
    active_only = (
        request.args.get(
            "active_only",
            "false",
        ).lower()
        == "true"
    )

    query = ListPermissionsQuery(
        active_only=active_only
    )

    permissions = ListPermissionsHandler().handle(query)

    return ApiResponse.success(
        data=Serializer.permissions(
            permissions
        )
    )


@permission_bp.get("/<uuid:permission_id>")
def get_permission(permission_id):
    query = GetPermissionQuery(
        permission_id=permission_id
    )

    permission = GetPermissionHandler().handle(query)

    return ApiResponse.success(
        data=Serializer.permission(
            permission
        )
    )


@permission_bp.put("/<uuid:permission_id>")
def update_permission(permission_id):
    data = UpdatePermissionSchema().load(
        request.json
    )

    command = UpdatePermissionCommand(
        permission_id=permission_id,
        **data,
    )

    permission = UpdatePermissionHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Permission updated successfully.",
        data=Serializer.permission(
            permission
        ),
    )


@permission_bp.patch(
    "/<uuid:permission_id>/deactivate"
)
def deactivate_permission(permission_id):
    command = DeactivatePermissionCommand(
        permission_id=permission_id
    )

    permission = DeactivatePermissionHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Permission deactivated successfully.",
        data=Serializer.permission(
            permission
        ),
    )


@permission_bp.get("/search")
def search_permissions():
    keyword = request.args.get(
        "keyword",
        "",
    )

    query = SearchPermissionsQuery(
        keyword=keyword
    )

    permissions = SearchPermissionsHandler().handle(
        query
    )

    return ApiResponse.success(
        data=Serializer.permissions(
            permissions
        )
    )