from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)
from app.modules.policy.domain.repositories.policy_repository import (
    PolicyRepository,
)


class PolicyEvaluator:

    def __init__(self):
        self.repository = PolicyRepository()

    def evaluate(self, request):

        policies = self.repository.get_active_policies()

        for policy in policies:

            if policy.name == "Maximum Teller Approval":

                if (
                    request.transaction_amount >
                    policy.maximum_amount
                ):
                    return EvaluationResult(
                        evaluator="Policy",
                        allowed=False,
                        reason="Transaction exceeds teller approval limit."
                    )

        return EvaluationResult(
            evaluator="Policy",
            allowed=True,
            reason="Policy validation passed."
        )