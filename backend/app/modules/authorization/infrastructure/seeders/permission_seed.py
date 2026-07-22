from app.modules.authorization.domain.entities.permission import Permission
from app.modules.authorization.domain.repositories.permission_repository import PermissionRepository


DEFAULT_PERMISSIONS = [
    ("Customer Read", "CUSTOMER_READ", "Customer", "Read"),
    ("Customer Create", "CUSTOMER_CREATE", "Customer", "Create"),
    ("Customer Update", "CUSTOMER_UPDATE", "Customer", "Update"),
    ("Customer Delete", "CUSTOMER_DELETE", "Customer", "Delete"),
    ("Account Read", "ACCOUNT_READ", "Account", "Read"),
    ("Account Create", "ACCOUNT_CREATE", "Account", "Create"),
    ("Account Update", "ACCOUNT_UPDATE", "Account", "Update"),
    ("Loan Approve", "LOAN_APPROVE", "Loan", "Approve"),
    ("Loan Reject", "LOAN_REJECT", "Loan", "Reject"),
    ("Transaction Create", "TRANSACTION_CREATE", "Transaction", "Create"),
    ("Audit View", "AUDIT_VIEW", "Audit", "View"),
    ("User Manage", "USER_MANAGE", "User", "Manage"),
]


def seed_permissions():
    repo = PermissionRepository()

    for name, code, resource, action in DEFAULT_PERMISSIONS:
        if not repo.exists_by_code(code):
            repo.create(
                Permission(
                    permission_name=name,
                    permission_code=code,
                    resource=resource,
                    action=action,
                )
            )