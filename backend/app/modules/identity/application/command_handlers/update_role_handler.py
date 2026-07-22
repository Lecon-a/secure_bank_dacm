from app.modules.identity.application.commands.update_role_command import (
    UpdateRoleCommand,
)
from app.modules.identity.domain.repositories.role_repository import (
    RoleRepository,
)


class UpdateRoleHandler:

    def __init__(self):
        self.repository = RoleRepository()

    def handle(self, command: UpdateRoleCommand):

        role = self.repository.get_by_id(command.role_id)

        if role is None:
            raise ValueError("Role not found.")

        role.role_name = command.role_name
        role.description = command.description
        role.is_active = command.is_active

        self.repository.update()

        return role