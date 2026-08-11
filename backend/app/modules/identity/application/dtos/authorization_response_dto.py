@dataclass
class AuthorizationResponseDTO:

    allowed: bool

    decision: str

    reason: str

    trust_score: float | None

    risk_score: float | None