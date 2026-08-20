from app.modules.identity.models.user_role import UserRole
from app.modules.identity.models.role_permission import RolePermission
from app.modules.identity.models.permission import Permission


class PermissionService:

    @staticmethod
    def has_permission(
        user_id,
        permission_code: str,
    ) -> bool:

        permission = (
            Permission.query
            .filter_by(
                permission_code=permission_code,
                is_active=True,
            )
            .first()
        )

        if not permission:
            return False

        role_permission = (
            RolePermission.query
            .filter_by(
                permission_id=permission.id,
            )
            .all()
        )

        if not role_permission:
            return False

        role_ids = [
            item.role_id
            for item in role_permission
        ]

        user_role = (
            UserRole.query
            .filter(
                UserRole.user_id == user_id,
                UserRole.role_id.in_(role_ids),
            )
            .first()
        )

        return user_role is not None