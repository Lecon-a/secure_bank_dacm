from dataclasses import dataclass


@dataclass
class CreatePermissionCommand:
    permission_name: str
    permission_code: str
    resource: str
    action: str
    description: str | None = None