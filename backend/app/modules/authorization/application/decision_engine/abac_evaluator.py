from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)


class UserAttributeRepository:
    def get_by_user_id(self, user_id):
        return None


class ResourceRepository:
    def get_by_id(self, resource_id):
        return None


class ABACEvaluator:

    def __init__(self):
        self.user_attribute_repository = UserAttributeRepository()
        self.resource_repository = ResourceRepository()

    def evaluate(self, request):

        user_attributes = self.user_attribute_repository.get_by_user_id(
            request.user_id
        )

        resource = self.resource_repository.get_by_id(
            request.resource_id
        )

        if user_attributes is None:
            return EvaluationResult(
                evaluator="ABAC",
                allowed=False,
                reason="User attributes not found."
            )

        if resource is None:
            return EvaluationResult(
                evaluator="ABAC",
                allowed=False,
                reason="Resource not found."
            )

        # Example Rule 1
        if (
            resource.required_clearance >
            user_attributes.clearance_level
        ):
            return EvaluationResult(
                evaluator="ABAC",
                allowed=False,
                reason="Insufficient clearance."
            )

        # Example Rule 2
        if (
            resource.department and
            resource.department != user_attributes.department
        ):
            return EvaluationResult(
                evaluator="ABAC",
                allowed=False,
                reason="Department mismatch."
            )

        return EvaluationResult(
            evaluator="ABAC",
            allowed=True,
            reason="Attribute validation passed."
        )