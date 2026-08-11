from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import ConflictException, NotFoundException

from app.modules.identity.models.role_permission import RolePermission
from app.modules.identity.repositories.role_permission_repository import (
    RolePermissionRepository,
)
from app.modules.identity.repositories.role_repository import RoleRepository
from app.modules.identity.repositories.permission_repository import (
    PermissionRepository,
)


class AssignPermissionHandler(BaseCommandHandler):

    def __init__(self):
        super().__init__(RolePermissionRepository())
        self.role_repository = RoleRepository()
        self.permission_repository = PermissionRepository()

    def handle(self, command):

        role = self.role_repository.get_by_id(command.role_id)
        if role is None:
            raise NotFoundException("Role not found.")

        permission = self.permission_repository.get_by_id(
            command.permission_id
        )
        if permission is None:
            raise NotFoundException("Permission not found.")

        if self.repository.exists(
            command.role_id,
            command.permission_id,
        ):
            raise ConflictException(
                "Permission already assigned to role."
            )

        assignment = RolePermission(
            role_id=command.role_id,
            permission_id=command.permission_id,
        )

        self.repository.create(assignment)

        return assignment