from dataclasses import dataclass
from uuid import UUID


@dataclass
class AssignPermissionCommand:
    role_id: UUID
    permission_id: UUID