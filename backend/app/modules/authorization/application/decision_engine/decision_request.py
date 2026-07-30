from dataclasses import dataclass
from typing import Any
from uuid import UUID


@dataclass
class DecisionRequest:
    """
    Carries all information required by the
    Hybrid Decision Engine to evaluate an
    authorization request.
    """

    # User
    user_id: UUID

    # Requested operation
    permission_code: str
    action: str

    # Target resource
    resource_id: UUID | None = None
    resource_type: str | None = None

    # Context
    ip_address: str | None = None
    location: str | None = None
    device_id: UUID | None = None
    device_type: str | None = None
    operating_system: str | None = None
    browser: str | None = None

    # Session
    session_id: UUID | None = None

    # Risk
    transaction_amount: float = 0.0

    # Optional extra information
    metadata: dict[str, Any] | None = None