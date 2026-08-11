from dataclasses import dataclass
from uuid import UUID


@dataclass
class RemovePermissionCommand:
    role_id: UUID
    permission_id: UUID