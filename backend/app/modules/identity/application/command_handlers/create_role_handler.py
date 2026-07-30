from app.modules.identity.models.role import Role
from app.modules.identity.repositories.role_repository import (
    RoleRepository,
)
from app.modules.identity.application.commands.create_role_command import (
    CreateRoleCommand,
)


class CreateRoleHandler:

    def __init__(self):
        self.repository = RoleRepository()

    def handle(self, command: CreateRoleCommand):

        if self.repository.exists_by_code(command.role_code):
            raise ValueError("Role code already exists.")

        if self.repository.exists_by_name(command.role_name):
            raise ValueError("Role name already exists.")

        role = Role(
            role_name=command.role_name,
            role_code=command.role_code,
            description=command.description,
            is_system=command.is_system,
        )

        return self.repository.create(role)