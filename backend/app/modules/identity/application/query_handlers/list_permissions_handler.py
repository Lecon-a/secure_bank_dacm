from app.core.queries.base_query_handler import BaseQueryHandler

from app.modules.authorization.domain.repositories.permission_repository import (
    PermissionRepository,
)


class ListPermissionsHandler(BaseQueryHandler):

    def __init__(self):
        super().__init__(PermissionRepository())

    def handle(self, query):

        if query.active_only:
            return self.repository.filter_by(
                is_active=True
            )

        return self.repository.get_all()