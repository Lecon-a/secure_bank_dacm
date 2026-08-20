from app.core.repositories.base_repository import BaseRepository

from app.modules.identity.models.permission import Permission


class PermissionRepository(BaseRepository):

    def __init__(self):
        super().__init__(Permission)

    def get_by_id(self, permission_id):
        return Permission.query.get(permission_id)

    def get_by_code(self, code):
        return Permission.query.filter_by(
            permission_code=code
        ).first()

    def get_all(self):
        return Permission.query.all()

    def get_active_permissions(self):
        return Permission.query.filter_by(
            is_active=True
        ).all()

    def search(self, keyword):
        return Permission.query.filter(
            Permission.permission_name.ilike(
                f"%{keyword}%"
            )
        ).all()