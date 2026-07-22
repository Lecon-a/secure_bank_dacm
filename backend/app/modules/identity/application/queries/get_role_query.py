from dataclasses import dataclass
from uuid import UUID


@dataclass(slots=True)
class GetRoleQuery:
    """
    Query for retrieving a role by its ID.
    """

    role_id: UUID