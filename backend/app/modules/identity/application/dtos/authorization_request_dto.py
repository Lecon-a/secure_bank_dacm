@dataclass
class AuthorizationRequestDTO:

    user_id: str

    permission_code: str

    action: str

    resource_id: str | None = None

    resource_type: str | None = None

    transaction_amount: float = 0

    ip_address: str | None = None

    location: str | None = None

    device_type: str | None = None

    operating_system: str | None = None

    browser: str | None = None