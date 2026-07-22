from dataclasses import dataclass


@dataclass(slots=True)
class CreateRoleCommand:
    """
    Command used to create a new role.
    """

    role_name: str
    role_code: str
    description: str | None = None
    is_system: bool = False