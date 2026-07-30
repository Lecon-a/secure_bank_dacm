from app.modules.authorization.application.decision_engine.evaluation_result import (
    EvaluationResult,
)
from app.modules.trust.domain.repositories.trust_repository import (
    TrustRepository,
)


class TrustEvaluator:

    TRUST_THRESHOLD = 60

    def __init__(self):
        self.repository = TrustRepository()

    def evaluate(self, request):

        trust = self.repository.get_current_score(
            request.user_id
        )

        if trust is None:
            return EvaluationResult(
                evaluator="Trust",
                allowed=False,
                reason="Trust score unavailable."
            )

        if trust.score < self.TRUST_THRESHOLD:
            return EvaluationResult(
                evaluator="Trust",
                allowed=False,
                score=trust.score,
                reason="Trust score below threshold."
            )

        return EvaluationResult(
            evaluator="Trust",
            allowed=True,
            score=trust.score,
            reason="Trust validation passed."
        )