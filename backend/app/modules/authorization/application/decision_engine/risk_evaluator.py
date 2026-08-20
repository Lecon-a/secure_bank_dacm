from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)


class RiskEvaluator:

    HIGH_RISK = 60
    MEDIUM_RISK = 30

    def evaluate(self, request):

        score = 0
        risk_factors = []

        # High-value transaction
        if request.transaction_amount > 5_000_000:
            score += 30
            risk_factors.append(
                "High transaction amount"
            )

        # Unknown device
        if request.device_type == "Unknown":
            score += 25
            risk_factors.append(
                "Unknown device"
            )

        # Foreign location
        if request.location == "Foreign":
            score += 20
            risk_factors.append(
                "Foreign location"
            )

        # High risk → Step-up authentication
        if score >= self.HIGH_RISK:
            return EvaluationResult(
                evaluator="Risk",
                allowed=True,
                requires_step_up=True,
                score=score,
                reason="High-risk transaction requires step-up authentication.",
                metadata={
                    "risk_factors": risk_factors,
                },
            )

        # Medium risk
        if score >= self.MEDIUM_RISK:
            return EvaluationResult(
                evaluator="Risk",
                allowed=True,
                requires_step_up=False,
                score=score,
                reason="Medium-risk transaction.",
                metadata={
                    "risk_factors": risk_factors,
                },
            )

        # Low risk
        return EvaluationResult(
            evaluator="Risk",
            allowed=True,
            requires_step_up=False,
            score=score,
            reason="Risk acceptable.",
            metadata={
                "risk_factors": risk_factors,
            },
        )