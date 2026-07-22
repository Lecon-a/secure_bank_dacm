from dataclasses import dataclass
from uuid import UUID
from datetime import datetime


@dataclass(slots=True)
class RoleResponseDTO:
    """
    DTO returned to clients.
    """

    id: UUID
    role_name: str
    role_code: str
    description: str | None
    is_system: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime