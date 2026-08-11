class RBACEvaluator:

    def __init__(self):

        self.authorization_service = AuthorizationService()

    def evaluate(self, request):

        has_permission = (
            self.authorization_service.has_permission(
                request.user_id,
                request.permission_code
            )
        )

        if not has_permission:

            return EvaluationResult(
                allowed=False,
                reason="Permission denied."
            )

        return EvaluationResult(
            allowed=True
        )