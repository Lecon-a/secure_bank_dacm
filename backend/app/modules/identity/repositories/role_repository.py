from sqlalchemy import or_

from app.modules.identity.models.role import Role
from app.modules.identity.repositories.base_repository import (
    BaseRepository,
)


class RoleRepository(BaseRepository):
    """
    Repository for Role entity.
    """

    model = Role

    def get_by_code(self, role_code: str):
        return Role.query.filter_by(
            role_code=role_code
        ).first()

    def get_by_name(self, role_name: str):
        return Role.query.filter_by(
            role_name=role_name
        ).first()

    def exists_by_code(self, role_code: str):
        return (
            self.get_by_code(role_code)
            is not None
        )

    def exists_by_name(self, role_name: str):
        return (
            self.get_by_name(role_name)
            is not None
        )

    def get_active_roles(self):
        return (
            Role.query
            .filter_by(is_active=True)
            .order_by(Role.role_name.asc())
            .all()
        )

    def search(self, keyword: str):
        return (
            Role.query.filter(
                or_(
                    Role.role_name.ilike(f"%{keyword}%"),
                    Role.role_code.ilike(f"%{keyword}%"),
                    Role.description.ilike(f"%{keyword}%"),
                )
            )
            .order_by(Role.role_name.asc())
            .all()
        )