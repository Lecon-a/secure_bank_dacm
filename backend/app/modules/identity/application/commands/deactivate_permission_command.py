from dataclasses import dataclass
from uuid import UUID


@dataclass
class DeactivatePermissionCommand:
    permission_id: UUID