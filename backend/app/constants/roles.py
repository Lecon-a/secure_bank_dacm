from enum import Enum


class SystemRole(str, Enum):
    """Enumeration for system roles."""
    SUPER_ADMIN = "SUPER_ADMIN"
    SECURITY_ADMIN = "SECURITY_ADMIN"
    BANK_MANAGER = "BANK_MANAGER"
    AUDITOR = "AUDITOR"
    TELLER = "TELLER"
    COUSTOMER_SUPPORT = "CUSTOMER_SUPPORT"
    COMPLIENCE_OFFICER = "COMPLIANCE_OFFICER"
    