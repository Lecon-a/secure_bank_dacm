from dataclasses import dataclass, field
from typing import Any


@dataclass
class FinalDecision:

    allowed: bool
    decision: str
    reason: str

    permission_code: str | None = None

    trust_score: float | None = None
    risk_score: float | None = None

    evaluator_results: dict[str, Any] = field(default_factory=dict)
    metadata: dict[str, Any] = field(default_factory=dict)

    @classmethod
    def allow(cls, **kwargs):
        return cls(
            allowed=True,
            decision="ALLOW",
            **kwargs,
        )

    @classmethod
    def deny(cls, **kwargs):
        return cls(
            allowed=False,
            decision="DENY",
            **kwargs,
        )

    @classmethod
    def step_up(cls, **kwargs):
        return cls(
            allowed=False,
            decision="STEP_UP",
            **kwargs,
        )

    @classmethod
    def review(cls, **kwargs):
        return cls(
            allowed=False,
            decision="REVIEW",
            **kwargs,
        )