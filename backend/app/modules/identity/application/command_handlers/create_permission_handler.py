from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import ConflictException

from app.modules.identity.models.permission import Permission
from app.modules.identity.repositories.permission_repository import (
    PermissionRepository,
)


class CreatePermissionHandler(BaseCommandHandler):

    def __init__(self):
        super().__init__(PermissionRepository())

    def handle(self, command):

        if self.repository.exists_by_code(command.permission_code):
            raise ConflictException(
                "Permission code already exists."
            )

        if self.repository.exists_by_name(command.permission_name):
            raise ConflictException(
                "Permission name already exists."
            )

        permission = Permission(
            permission_name=command.permission_name,
            permission_code=command.permission_code,
            resource=command.resource,
            action=command.action,
            description=command.description,
        )

        self.repository.create(permission)

        return permission