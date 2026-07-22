from dataclasses import dataclass
from uuid import UUID


@dataclass(slots=True)
class DeactivateRoleCommand:
    """
    Command used to deactivate a role.
    """

    role_id: UUID