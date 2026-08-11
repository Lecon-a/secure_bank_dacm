from app.modules.identity.application.queries.list_roles_query import (
    ListRolesQuery,
)
from app.modules.identity.repositories.role_repository import (
    RoleRepository,
)


class ListRolesHandler:

    def __init__(self):
        self.repository = RoleRepository()

    def handle(self, query: ListRolesQuery):

        if query.active_only:
            return self.repository.get_active_roles()

        return self.repository.get_all()