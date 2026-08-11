from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import NotFoundException

from app.modules.identity.repositories.role_permission_repository import (
    RolePermissionRepository,
)


class RemovePermissionHandler(BaseCommandHandler):

    def __init__(self):
        super().__init__(RolePermissionRepository())

    def handle(self, command):

        assignment = self.repository.remove(
            command.role_id,
            command.permission_id,
        )

        if assignment is None:
            raise NotFoundException(
                "Role-permission assignment not found."
            )

        return assignment