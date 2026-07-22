from app.modules.identity.application.queries.get_role_query import (
    GetRoleQuery,
)
from app.modules.identity.domain.repositories.role_repository import (
    RoleRepository,
)


class GetRoleHandler:

    def __init__(self):
        self.repository = RoleRepository()

    def handle(self, query: GetRoleQuery):
        return self.repository.get_by_id(query.role_id)