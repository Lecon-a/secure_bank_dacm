class Serializer:

    @staticmethod
    def role(role):

        return {
            "id": str(role.id),
            "role_name": role.role_name,
            "role_code": role.role_code,
            "description": role.description,
            "is_system": role.is_system,
            "is_active": role.is_active,
            "created_at": role.created_at.isoformat(),
            "updated_at": role.updated_at.isoformat(),
        }

    @staticmethod
    def roles(roles):
        return [Serializer.role(role) for role in roles]


    @staticmethod
    def permission(permission):

        return {
            "id": str(permission.id),
            "permission_name": permission.permission_name,
            "permission_code": permission.permission_code,
            "resource": permission.resource,
            "action": permission.action,
            "description": permission.description,
            "is_active": permission.is_active,
            "created_at": permission.created_at.isoformat(),
            "updated_at": permission.updated_at.isoformat(),
        }

    @staticmethod
    def permissions(permissions):

        return [
            Serializer.permission(p)
            for p in permissions
        ]