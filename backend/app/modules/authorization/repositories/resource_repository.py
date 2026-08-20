from app.modules.identity.models.access_resource import AccessResource


class ResourceRepository:

    def get_by_id(self, resource_id):

        return (
            AccessResource.query
            .filter_by(
                id=resource_id,
                is_active=True,
            )
            .first()
        )

    def get_by_type(self, resource_type):

        return (
            AccessResource.query
            .filter_by(
                resource_type=resource_type,
                is_active=True,
            )
            .all()
        )