from app.core.queries.base_query_handler import BaseQueryHandler

from app.modules.authorization.repositories.permission_repository import (
    PermissionRepository,
)


class SearchPermissionsHandler(BaseQueryHandler):

    def __init__(self):
        super().__init__(PermissionRepository())

    def handle(self, query):

        return self.repository.search(
            query.keyword
        )