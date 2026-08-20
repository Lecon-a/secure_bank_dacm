from app.core.repositories.base_repository import BaseRepository

from app.modules.identity.models.user_role import UserRole

class UserRoleRepository(BaseRepository):

    def __init__(self):
        super().__init__(UserRole)

    def exists(self, user_id, role_id):

        return (
            UserRole.query.filter_by(
                user_id=user_id,
                role_id=role_id,
            ).first()
            is not None
        )

    def get_roles(self, user_id):

        return (
            UserRole.query.filter_by(
                user_id=user_id
            ).all()
        )

    def get_users(self, role_id):

        return (
            UserRole.query.filter_by(
                role_id=role_id
            ).all()
        )

    def remove(self, user_id, role_id):

        assignment = UserRole.query.filter_by(
            user_id=user_id,
            role_id=role_id,
        ).first()

        if assignment:
            self.delete(assignment)

        return assignment