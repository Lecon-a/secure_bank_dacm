from dataclasses import dataclass


@dataclass(slots=True)
class CreateRoleDTO:
    """
    DTO used when creating a new role.
    """

    role_name: str
    role_code: str
    description: str | None = None
    is_system: bool = False
    is_active: bool = True