from dataclasses import dataclass
from uuid import UUID


@dataclass
class UpdatePermissionCommand:
    permission_id: UUID
    permission_name: str
    resource: str
    action: str
    description: str | None
    is_active: bool