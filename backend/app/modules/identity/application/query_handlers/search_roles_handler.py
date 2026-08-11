from app.modules.identity.application.queries.search_roles_query import (
    SearchRolesQuery,
)
from app.modules.identity.repositories.role_repository import (
    RoleRepository,
)


class SearchRolesHandler:

    def __init__(self):
        self.repository = RoleRepository()

    def handle(self, query: SearchRolesQuery):
        return self.repository.search(query.keyword)