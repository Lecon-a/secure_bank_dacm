from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import NotFoundException

from app.modules.authorization.domain.repositories.permission_repository import (
    PermissionRepository,
)


class UpdatePermissionHandler(BaseCommandHandler):

    def __init__(self):
        super().__init__(PermissionRepository())

    def handle(self, command):

        permission = self.repository.get_by_id(command.permission_id)

        if permission is None:
            raise NotFoundException(
                "Permission not found."
            )

        permission.permission_name = command.permission_name
        permission.resource = command.resource
        permission.action = command.action
        permission.description = command.description
        permission.is_active = command.is_active

        self.repository.update(permission)

        return permission