from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)

from app.modules.policy.domain.repositories.policy_repository import (
    PolicyRepository,
)

import json


class PolicyEvaluator:

    def __init__(self):
        self.repository = PolicyRepository()

    def evaluate(self, request):

        policies = (
            self.repository.get_applicable_policies(
                request.resource_type,
                request.action,
            )
        )

        # No applicable policies
        if not policies:
            return EvaluationResult(
                evaluator="Policy",
                allowed=True,
                reason="No applicable policy restrictions.",
                metadata={
                    "policy_count": 0,
                },
            )

        for policy in policies:

            if not policy.rule:
                continue

            try:
                rule = json.loads(policy.rule)

            except json.JSONDecodeError:
                return EvaluationResult(
                    evaluator="Policy",
                    allowed=False,
                    reason=f"Invalid policy rule: {policy.policy_name}.",
                    metadata={
                        "policy_name": policy.policy_name,
                    },
                )

            # Maximum transaction amount
            max_amount = rule.get(
                "max_transaction_amount"
            )

            if (
                max_amount is not None
                and request.transaction_amount is not None
                and request.transaction_amount > max_amount
            ):
                return EvaluationResult(
                    evaluator="Policy",
                    allowed=False,
                    reason="Transaction exceeds policy limit.",
                    metadata={
                        "policy_name": policy.policy_name,
                        "max_transaction_amount": max_amount,
                        "transaction_amount": request.transaction_amount,
                    },
                )

        return EvaluationResult(
            evaluator="Policy",
            allowed=True,
            reason="Policy validation passed.",
            metadata={
                "policy_count": len(policies),
            },
        )