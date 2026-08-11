from app.modules.identity.application.commands.deactivate_role_command import (
    DeactivateRoleCommand,
)
from app.modules.identity.repositories.role_repository import (
    RoleRepository,
)


class DeactivateRoleHandler:

    def __init__(self):
        self.repository = RoleRepository()

    def handle(self, command: DeactivateRoleCommand):

        role = self.repository.get_by_id(command.role_id)

        if role is None:
            raise ValueError("Role not found.")

        role.is_active = False

        self.repository.update()

        return role