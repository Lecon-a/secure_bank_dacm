from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)

from app.modules.identity.repositories.role_permission_repository import (
    RolePermissionRepository,
)

from app.modules.identity.repositories.user_role_repository import (
    UserRoleRepository,
)

from app.modules.authorization.repositories.permission_repository import (
    PermissionRepository,
)


class RBACEvaluator:

    def __init__(self):

        self.role_permissions = RolePermissionRepository()
        self.user_roles = UserRoleRepository()
        self.permissions = PermissionRepository()

    def evaluate(self, request):

        permission = self.permissions.get_by_code(
            request.permission_code
        )

        if permission is None:
            return EvaluationResult(
                evaluator="RBAC",
                allowed=False,
                reason="Permission does not exist.",
            )

        assignments = self.user_roles.get_roles(
            request.user_id
        )

        for assignment in assignments:

            if self.role_permissions.exists(
                assignment.role_id,
                permission.id,
            ):
                return EvaluationResult(
                    evaluator="RBAC",
                    allowed=True,
                    reason="Permission granted through assigned role.",
                    metadata={
                        "permission_code": request.permission_code,
                        "role_id": str(
                            assignment.role_id
                        ),
                    },
                )

        return EvaluationResult(
            evaluator="RBAC",
            allowed=False,
            reason="User does not have the required permission.",
            metadata={
                "permission_code": request.permission_code,
            },
        )