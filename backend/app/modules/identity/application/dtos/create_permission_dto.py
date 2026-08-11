from dataclasses import dataclass


@dataclass
class CreatePermissionDTO:
    permission_name: str
    permission_code: str
    resource: str
    action: str
    description: str | None = None