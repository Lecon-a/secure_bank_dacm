from dataclasses import dataclass


@dataclass(slots=True)
class UpdateRoleDTO:
    """
    DTO used when updating an existing role.
    """

    role_name: str | None = None
    description: str | None = None
    is_active: bool | None = None