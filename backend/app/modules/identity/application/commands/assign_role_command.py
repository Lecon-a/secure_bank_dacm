from dataclasses import dataclass
from uuid import UUID


@dataclass
class AssignRoleCommand:
    user_id: UUID
    role_id: UUID