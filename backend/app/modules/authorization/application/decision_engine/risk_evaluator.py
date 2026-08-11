from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)


class RiskEvaluator:

    HIGH_RISK = 80
    MEDIUM_RISK = 50

    def evaluate(self, request):

        score = 0

        if request.transaction_amount > 5_000_000:
            score += 30

        if request.device_type == "Unknown":
            score += 25

        if request.location == "Foreign":
            score += 20

        if score >= self.HIGH_RISK:

            return EvaluationResult(
                evaluator="Risk",
                allowed=True,
                requires_step_up=True,
                score=score,
                reason="High-risk transaction."
            )

        return EvaluationResult(
            evaluator="Risk",
            allowed=True,
            score=score,
            reason="Risk acceptable."
        )