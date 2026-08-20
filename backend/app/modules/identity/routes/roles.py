from uuid import UUID

from flask import Blueprint
from flask import request

from app.utils.api_response import ApiResponse
from app.core.serializers.serializer import Serializer

from app.core.exceptions import ConflictException
from app.core.exceptions import NotFoundException

from app.modules.identity.repositories.user_role_repository import (
    UserRoleRepository,
)

from app.modules.identity.application.commands.assign_role_command import (
    AssignRoleCommand,
)

from app.modules.identity.application.commands.remove_role_command import (
    RemoveRoleCommand,
)

from app.modules.identity.application.command_handlers.assign_role_handler import (
    AssignRoleHandler,
)

from app.modules.identity.application.command_handlers.remove_role_handler import (
    RemoveRoleHandler,
)

from app.modules.identity.application.commands.create_role_command import (
    CreateRoleCommand,
)

from app.modules.identity.application.commands.update_role_command import (
    UpdateRoleCommand,
)

from app.modules.identity.application.commands.deactivate_role_command import (
    DeactivateRoleCommand,
)

from app.modules.identity.application.commands.assign_permission_command import (
    AssignPermissionCommand,
)

from app.modules.identity.application.commands.remove_permission_command import (
    RemovePermissionCommand,
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

from app.modules.identity.application.command_handlers.assign_permission_handler import (
    AssignPermissionHandler,
)

from app.modules.identity.application.command_handlers.remove_permission_handler import (
    RemovePermissionHandler,
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

from app.modules.identity.repositories.role_permission_repository import (
    RolePermissionRepository,
)

from app.modules.identity.repositories.permission_repository import (
    PermissionRepository,
)

from app.modules.identity.schemas.role_schema import (
    CreateRoleSchema,
    UpdateRoleSchema,
    RoleResponseSchema,
)


role_bp = Blueprint(
    "roles",
    __name__,
    url_prefix="/api/v1/roles",
)


# =========================================================
# RESPONSE SERIALIZERS
# =========================================================

role_response_schema = RoleResponseSchema()

role_response_list_schema = RoleResponseSchema(
    many=True
)


# =========================================================
# CREATE ROLE
# =========================================================

@role_bp.post("")
def create_role():

    data = CreateRoleSchema().load(
        request.json
    )

    command = CreateRoleCommand(
        **data
    )

    role = CreateRoleHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Role created successfully.",
        data=role_response_schema.dump(
            role
        ),
        status_code=201,
    )


# =========================================================
# LIST ROLES
# =========================================================

@role_bp.get("")
def list_roles():

    active_only = request.args.get(
        "active_only",
        "false",
    ).lower() == "true"

    query = ListRolesQuery(
        active_only=active_only,
    )

    roles = ListRolesHandler().handle(
        query
    )

    return ApiResponse.success(
        message="Roles retrieved successfully.",
        data=role_response_list_schema.dump(
            roles
        ),
    )


# =========================================================
# SEARCH ROLES
# =========================================================

@role_bp.get("/search")
def search_roles():

    keyword = request.args.get(
        "keyword",
        "",
    )

    query = SearchRolesQuery(
        keyword=keyword,
    )

    roles = SearchRolesHandler().handle(
        query
    )

    return ApiResponse.success(
        message="Roles search completed successfully.",
        data=role_response_list_schema.dump(
            roles
        ),
    )


# =========================================================
# GET ROLE
# =========================================================

@role_bp.get("/<uuid:role_id>")
def get_role(role_id):

    query = GetRoleQuery(
        role_id=role_id,
    )

    role = GetRoleHandler().handle(
        query
    )

    return ApiResponse.success(
        message="Role retrieved successfully.",
        data=role_response_schema.dump(
            role
        ),
    )


# =========================================================
# UPDATE ROLE
# =========================================================

@role_bp.put("/<uuid:role_id>")
def update_role(role_id):

    data = UpdateRoleSchema().load(
        request.json
    )

    command = UpdateRoleCommand(
        role_id=role_id,
        **data,
    )

    role = UpdateRoleHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Role updated successfully.",
        data=role_response_schema.dump(
            role
        ),
    )


# =========================================================
# DEACTIVATE ROLE
# =========================================================

@role_bp.patch(
    "/<uuid:role_id>/deactivate"
)
def deactivate_role(role_id):

    command = DeactivateRoleCommand(
        role_id=role_id,
    )

    role = DeactivateRoleHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Role deactivated successfully.",
        data=role_response_schema.dump(
            role
        ),
    )


# ============================================================
# USER → ROLE
# ============================================================


@role_bp.post(
    "/<uuid:role_id>/users/<uuid:user_id>"
)
def assign_role_to_user(
    role_id,
    user_id,
):

    command = AssignRoleCommand(
        user_id=user_id,
        role_id=role_id,
    )

    assignment = AssignRoleHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Role assigned successfully.",
        data={
            "role_id": str(
                assignment.role_id
            ),
            "user_id": str(
                assignment.user_id
            ),
        },
        status_code=201,
    )


@role_bp.delete(
    "/<uuid:role_id>/users/<uuid:user_id>"
)
def remove_role_from_user(
    role_id,
    user_id,
):

    command = RemoveRoleCommand(
        user_id=user_id,
        role_id=role_id,
    )

    assignment = RemoveRoleHandler().handle(
        command
    )

    return ApiResponse.success(
        message="Role removed successfully.",
        data={
            "role_id": str(
                assignment.role_id
            ),
            "user_id": str(
                assignment.user_id
            ),
        },
    )


# ============================================================
# USER → ROLES
# ============================================================

@role_bp.get("/users/<uuid:user_id>/roles")
def get_user_roles(user_id):

    repository = UserRoleRepository()

    assignments = repository.get_roles(
        user_id
    )

    roles = []

    for assignment in assignments:

        if assignment.role is None:
            continue

        roles.append(
            {
                "id": str(assignment.role.id),
                "role_name": assignment.role.role_name,
                "role_code": assignment.role.role_code,
                "description": assignment.role.description,
                "is_system": assignment.role.is_system,
                "is_active": assignment.role.is_active,
            }
        )

    return ApiResponse.success(
        message="User roles retrieved successfully.",
        data=roles,
    )


# =========================================================
# LIST PERMISSIONS ASSIGNED TO ROLE
# =========================================================

@role_bp.get(
    "/<uuid:role_id>/permissions"
)
def list_role_permissions(role_id):

    role_permission_repository = (
        RolePermissionRepository()
    )

    assignments = (
        role_permission_repository
        .get_permissions_for_role(
            role_id
        )
    )

    permission_repository = (
        PermissionRepository()
    )

    permissions = []

    for assignment in assignments:

        permission = (
            permission_repository.get_by_id(
                assignment.permission_id
            )
        )

        if permission is not None:
            permissions.append(
                permission
            )

    return ApiResponse.success(
        message=(
            "Role permissions retrieved successfully."
        ),
        data=Serializer.permissions(
            permissions
        ),
    )


# =========================================================
# ASSIGN PERMISSION TO ROLE
# =========================================================

@role_bp.post(
    "/<uuid:role_id>/permissions"
)
def assign_permission_to_role(role_id):

    data = request.get_json()

    permission_id = data.get(
        "permission_id"
    )

    if not permission_id:

        return ApiResponse.error(
            message="permission_id is required.",
            status_code=400,
        )

    try:

        permission_uuid = UUID(
            permission_id
        )

    except (ValueError, TypeError):

        return ApiResponse.error(
            message="Invalid permission_id.",
            status_code=400,
        )

    try:

        command = AssignPermissionCommand(
            role_id=role_id,
            permission_id=permission_uuid,
        )

        assignment = (
            AssignPermissionHandler()
            .handle(command)
        )

        return ApiResponse.success(
            message=(
                "Permission assigned to role successfully."
            ),
            data={
                "role_id": str(
                    assignment.role_id
                ),
                "permission_id": str(
                    assignment.permission_id
                ),
            },
            status_code=201,
        )

    except ConflictException as err:

        return ApiResponse.error(
            message=str(err),
            status_code=409,
        )

    except NotFoundException as err:

        return ApiResponse.error(
            message=str(err),
            status_code=404,
        )

# =========================================================
# REMOVE PERMISSION FROM ROLE
# =========================================================

@role_bp.delete(
    "/<uuid:role_id>/permissions/<uuid:permission_id>"
)
def remove_permission_from_role(
    role_id,
    permission_id,
):

    command = RemovePermissionCommand(
        role_id=role_id,
        permission_id=permission_id,
    )

    assignment = (
        RemovePermissionHandler()
        .handle(command)
    )

    return ApiResponse.success(
        message=(
            "Permission removed from role successfully."
        ),
        data={
            "role_id": str(
                assignment.role_id
            ),
            "permission_id": str(
                assignment.permission_id
            ),
        },
    )