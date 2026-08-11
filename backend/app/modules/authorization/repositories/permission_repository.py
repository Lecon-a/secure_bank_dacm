from app.core.repositories.base_repository import BaseRepository


class PermissionRepository(BaseRepository):
    def __init__(self):
        from app.modules.identity.models.permission import Permission

        super().__init__(Permission)

    def get_by_id(self, permission_id):
        from app.modules.identity.models.permission import Permission

        return Permission.query.get(permission_id)

    def get_all(self):
        from app.modules.identity.models.permission import Permission

        return Permission.query.all()

    def get_active_permissions(self):
        from app.modules.identity.models.permission import Permission

        return Permission.query.filter_by(is_active=True).all()

    def search(self, keyword):
        from app.modules.identity.models.permission import Permission

        return Permission.query.filter(
            Permission.permission_name.ilike(f"%{keyword}%")
        ).all()
