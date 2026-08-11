from dataclasses import dataclass
from uuid import UUID


@dataclass
class RemoveRoleCommand:
    user_id: UUID
    role_id: UUID