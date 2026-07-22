from uuid import UUID

from flask import Blueprint
from flask import request

from app.utils.api_response import ApiResponse

from app.modules.identity.application.commands.create_role_command import (
    CreateRoleCommand,
)

from app.modules.identity.application.commands.update_role_command import (
    UpdateRoleCommand,
)

from app.modules.identity.application.commands.deactivate_role_command import (
    DeactivateRoleCommand,
)

from app.modules.identity.application.command_handlers.create_role_handler import (
    CreateRoleHandler,
)

from app.modules.identity.application.command_handlers.update_role_handler import (
    UpdateRoleHandler,
)

from app.modules.identity.application.command_handlers.deactivate_role_handler import (
    DeactivateRoleHandler,
)

from app.modules.identity.application.queries.get_role_query import (
    GetRoleQuery,
)

from app.modules.identity.application.queries.list_roles_query import (
    ListRolesQuery,
)

from app.modules.identity.application.queries.search_roles_query import (
    SearchRolesQuery,
)

from app.modules.identity.application.query_handlers.get_role_handler import (
    GetRoleHandler,
)

from app.modules.identity.application.query_handlers.list_roles_handler import (
    ListRolesHandler,
)

from app.modules.identity.application.query_handlers.search_roles_handler import (
    SearchRolesHandler,
)

from app.modules.identity.presentation.schemas.role_schema import (
    CreateRoleSchema,
    UpdateRoleSchema,
)

role_bp = Blueprint(
    "roles",
    __name__,
    url_prefix="/api/v1/roles",
)


@role_bp.post("")
def create_role():

    data = CreateRoleSchema().load(request.json)

    command = CreateRoleCommand(**data)

    role = CreateRoleHandler().handle(command)

    return ApiResponse.success(
        message="Role created successfully.",
        data=role,
        status_code=201,
    )


@role_bp.get("")
def list_roles():

    active_only = request.args.get(
        "active_only",
        "false",
    ).lower() == "true"

    query = ListRolesQuery(
        active_only=active_only,
    )

    roles = ListRolesHandler().handle(query)

    return ApiResponse.success(
        data=roles,
    )


@role_bp.get("/<uuid:role_id>")
def get_role(role_id):

    query = GetRoleQuery(
        role_id=role_id,
    )

    role = GetRoleHandler().handle(query)

    return ApiResponse.success(
        data=role,
    )


@role_bp.put("/<uuid:role_id>")
def update_role(role_id):

    data = UpdateRoleSchema().load(request.json)

    command = UpdateRoleCommand(
        role_id=role_id,
        **data,
    )

    role = UpdateRoleHandler().handle(command)

    return ApiResponse.success(
        message="Role updated successfully.",
        data=role,
    )


@role_bp.patch("/<uuid:role_id>/deactivate")
def deactivate_role(role_id):

    command = DeactivateRoleCommand(
        role_id=role_id,
    )

    role = DeactivateRoleHandler().handle(command)

    return ApiResponse.success(
        message="Role deactivated successfully.",
        data=role,
    )


@role_bp.get("/search")
def search_roles():

    keyword = request.args.get(
        "keyword",
        "",
    )

    query = SearchRolesQuery(
        keyword=keyword,
    )

    roles = SearchRolesHandler().handle(query)

    return ApiResponse.success(
        data=roles,
    )


