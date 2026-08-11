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

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "DecisionRequest":
        """
        Create a DecisionRequest from a dictionary.
        """

        return cls(
            user_id=UUID(str(data["user_id"])),

            permission_code=data["permission_code"],
            action=data["action"],

            resource_id=(
                UUID(str(data["resource_id"]))
                if data.get("resource_id")
                else None
            ),
            resource_type=data.get("resource_type"),

            ip_address=data.get("ip_address"),
            location=data.get("location"),

            device_id=(
                UUID(str(data["device_id"]))
                if data.get("device_id")
                else None
            ),

            device_type=data.get("device_type"),
            operating_system=data.get("operating_system"),
            browser=data.get("browser"),

            session_id=(
                UUID(str(data["session_id"]))
                if data.get("session_id")
                else None
            ),

            transaction_amount=float(
                data.get("transaction_amount", 0.0)
            ),

            metadata=data.get("metadata"),
        )