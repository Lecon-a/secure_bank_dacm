from dataclasses import dataclass
from uuid import UUID


@dataclass(slots=True)
class UpdateRoleCommand:
    """
    Command used to update an existing role.
    """

    role_id: UUID
    role_name: str
    description: str | None = None
    is_active: bool = True