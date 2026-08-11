from app.core.commands.base_command_handler import BaseCommandHandler
from app.core.exceptions import ConflictException
from app.core.exceptions import NotFoundException

from app.modules.identity.models.user_role import UserRole

from app.modules.identity.repositories.user_repository import UserRepository
from app.modules.identity.repositories.role_repository import RoleRepository
from app.modules.identity.repositories.user_role_repository import UserRoleRepository


class AssignRoleHandler(BaseCommandHandler):

    def __init__(self):

        super().__init__(UserRoleRepository())

        self.user_repository = UserRepository()
        self.role_repository = RoleRepository()

    def handle(self, command):

        user = self.user_repository.get_by_id(command.user_id)

        if user is None:
            raise NotFoundException(
                "User not found."
            )

        role = self.role_repository.get_by_id(command.role_id)

        if role is None:
            raise NotFoundException(
                "Role not found."
            )

        if self.repository.exists(
            command.user_id,
            command.role_id,
        ):
            raise ConflictException(
                "Role already assigned."
            )

        assignment = UserRole(
            user_id=command.user_id,
            role_id=command.role_id,
        )

        self.repository.create(
            assignment
        )

        return assignment