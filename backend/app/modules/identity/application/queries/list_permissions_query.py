from dataclasses import dataclass


@dataclass
class ListPermissionsQuery:
    active_only: bool = False