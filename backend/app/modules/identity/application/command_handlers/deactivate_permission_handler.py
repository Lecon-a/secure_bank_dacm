from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import NotFoundException

from app.modules.identity.repositories.permission_repository import (
    PermissionRepository,
)


class DeactivatePermissionHandler(BaseCommandHandler):

    def __init__(self):
        super().__init__(PermissionRepository())

    def handle(self, command):

        permission = self.repository.get_by_id(
            command.permission_id
        )

        if permission is None:
            raise NotFoundException(
                "Permission not found."
            )

        permission.is_active = False

        self.repository.update(
            permission
        )

        return permission