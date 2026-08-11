from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import NotFoundException

from app.modules.identity.repositories.user_role_repository import (
    UserRoleRepository,
)


class RemoveRoleHandler(BaseCommandHandler):

    def __init__(self):

        super().__init__(
            UserRoleRepository()
        )

    def handle(self, command):

        assignment = self.repository.remove(
            command.user_id,
            command.role_id,
        )

        if assignment is None:
            raise NotFoundException(
                "User-role assignment not found."
            )

        return assignment