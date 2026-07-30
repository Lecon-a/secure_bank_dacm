from datetime import datetime

from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)


class ContextEvaluator:

    def evaluate(self, request):

        # Example Rule 1
        if request.location not in [
            "Head Office",
            "Branch Office"
        ]:
            return EvaluationResult(
                evaluator="Context",
                allowed=False,
                reason="Unauthorized location."
            )

        # Example Rule 2
        current_hour = datetime.now().hour

        if current_hour < 8 or current_hour > 18:
            return EvaluationResult(
                evaluator="Context",
                allowed=False,
                reason="Outside approved working hours."
            )

        # Example Rule 3
        if request.device_type == "Unknown":
            return EvaluationResult(
                evaluator="Context",
                allowed=False,
                reason="Unknown device detected."
            )

        return EvaluationResult(
            evaluator="Context",
            allowed=True,
            reason="Context validation passed."
        )