from app.core.exceptions import NotFoundException
from app.core.queries.base_query_handler import BaseQueryHandler

from app.modules.authorization.domain.repositories.permission_repository import (
    PermissionRepository,
)


class GetPermissionHandler(BaseQueryHandler):

    def __init__(
        self,
        repository: PermissionRepository,
    ):
        super().__init__(repository)

    def handle(self, query):

        permission = self.repository.get_by_id(query.permission_id)

        if permission is None:
            raise NotFoundException(
                "Permission not found."
            )

        return permission