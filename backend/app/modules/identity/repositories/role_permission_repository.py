from app.core.repositories.base_repository import BaseRepository

from ..entities.role_permission import RolePermission


class RolePermissionRepository(BaseRepository):

    def __init__(self):
        super().__init__(RolePermission)

    def exists(self, role_id, permission_id):
        return (
            RolePermission.query.filter_by(
                role_id=role_id,
                permission_id=permission_id,
            ).first()
            is not None
        )

    def get_permissions_for_role(self, role_id):
        return RolePermission.query.filter_by(
            role_id=role_id
        ).all()

    def get_roles_for_permission(self, permission_id):
        return RolePermission.query.filter_by(
            permission_id=permission_id
        ).all()

    def remove(self, role_id, permission_id):

        assignment = RolePermission.query.filter_by(
            role_id=role_id,
            permission_id=permission_id,
        ).first()

        if assignment:
            self.delete(assignment)

        return assignment