from dataclasses import dataclass


@dataclass
class UpdatePermissionDTO:
    permission_name: str
    resource: str
    action: str
    description: str | None
    is_active: bool