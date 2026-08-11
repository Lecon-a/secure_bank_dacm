from dataclasses import dataclass


@dataclass(slots=True)
class ListRolesQuery:
    """
    Query for listing all roles.
    """

    active_only: bool = False