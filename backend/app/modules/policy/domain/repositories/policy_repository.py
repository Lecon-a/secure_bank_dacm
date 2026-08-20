from app.core.repositories.base_repository import BaseRepository

from ..entities.access_policy import AccessPolicy


class PolicyRepository(BaseRepository):

    def __init__(self):
        super().__init__(AccessPolicy)

    def get_active_policies(self):

        return (
            AccessPolicy.query
            .filter_by(is_active=True)
            .all()
        )

    def get_by_resource_type(
        self,
        resource_type,
    ):

        return (
            AccessPolicy.query
            .filter_by(
                resource_type=resource_type,
                is_active=True,
            )
            .all()
        )

    def get_applicable_policies(
        self,
        resource_type,
        action,
    ):

        return (
            AccessPolicy.query
            .filter(
                AccessPolicy.is_active.is_(True),
                AccessPolicy.resource_type == resource_type,
                AccessPolicy.action == action,
            )
            .all()
        )