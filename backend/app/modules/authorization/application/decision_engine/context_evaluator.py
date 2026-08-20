from datetime import datetime

from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)


class ContextEvaluator:

    APPROVED_START_HOUR = 8
    APPROVED_END_HOUR = 16

    def evaluate(self, request):

        # Rule 1: Location
        allowed_locations = [
            "Head Office",
            "Branch Office",
            "Lagos",
        ]

        if request.location not in allowed_locations:
            return EvaluationResult(
                evaluator="Context",
                allowed=False,
                reason="Unauthorized location.",
                metadata={
                    "location": request.location,
                },
            )

        # Rule 2: Working hours
        current_hour = getattr(
            request,
            "current_hour",
            datetime.now().hour,
        )

        if (
            current_hour < self.APPROVED_START_HOUR
            or current_hour > self.APPROVED_END_HOUR
        ):
            return EvaluationResult(
                evaluator="Context",
                allowed=False,
                reason="Outside approved working hours.",
                metadata={
                    "current_hour": current_hour,
                    "approved_start": self.APPROVED_START_HOUR,
                    "approved_end": self.APPROVED_END_HOUR,
                },
            )

        # Rule 3: Device
        if request.device_type == "Unknown":
            return EvaluationResult(
                evaluator="Context",
                allowed=False,
                reason="Unknown device detected.",
                metadata={
                    "device_type": request.device_type,
                },
            )

        return EvaluationResult(
            evaluator="Context",
            allowed=True,
            reason="Context validation passed.",
            metadata={
                "location": request.location,
                "device_type": request.device_type,
                "operating_system": request.operating_system,
                "browser": request.browser,
                "current_hour": current_hour,
            },
        )