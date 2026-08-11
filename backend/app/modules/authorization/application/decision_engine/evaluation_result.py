from dataclasses import dataclass, field
from typing import Any


@dataclass
class EvaluationResult:
    """
    Represents the result returned by a single evaluator
    (RBAC, ABAC, Trust, Context, Risk, or Policy).
    """

    # Whether this evaluator passed
    allowed: bool

    # Explanation of the decision
    reason: str = ""

    # Optional numerical score
    score: float | None = None

    # Whether additional authentication is required
    requires_step_up: bool = False

    # Name of the evaluator
    evaluator: str = ""

    # Extra information
    metadata: dict[str, Any] = field(default_factory=dict)