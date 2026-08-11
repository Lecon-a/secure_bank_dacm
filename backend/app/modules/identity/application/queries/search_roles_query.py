from dataclasses import dataclass


@dataclass(slots=True)
class SearchRolesQuery:
    """
    Query for searching roles.
    """

    keyword: str