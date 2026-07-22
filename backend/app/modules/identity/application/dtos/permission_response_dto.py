from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass
class PermissionResponseDTO:
    id: UUID
    permission_name: str
    permission_code: str
    resource: str
    action: str
    description: str | None
    is_active: bool
    created_at: datetime
    updated_at: datetime