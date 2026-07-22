from enum import Enum

class AccountStatus(Enum):
    """Available account states for users."""
    ACTIVE = "ACTIVE"
    LOCKED = "LOCKED"
    SUSPENDED = "SUSPENDED"
    DISABLED = "DISABLED"