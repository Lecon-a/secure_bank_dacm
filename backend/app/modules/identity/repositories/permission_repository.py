from app.core.repositories.base_repository import BaseRepository

from ..models.permission import Permission


class PermissionRepository(BaseRepository):

    def __init__(self):
        super().__init__(Permission)

    def get_by_code(self, code):
        return Permission.query.filter_by(
            permission_code=code
        ).first()

    def get_by_name(self, name):
        return Permission.query.filter_by(
            permission_name=name
        ).first()

    def get_by_resource(self, resource):
        return Permission.query.filter_by(
            resource=resource,
            is_active=True,
        ).all()

    def exists_by_code(self, code):
        return self.get_by_code(code) is not None

    def exists_by_name(self, name):
        return self.get_by_name(name) is not None

    def search(self, keyword):
        return Permission.query.filter(
            Permission.permission_name.ilike(f"%{keyword}%")
        ).all()