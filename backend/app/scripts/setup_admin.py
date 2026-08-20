from app import create_app
from app.extensions import db

from app.modules.identity.models.permission import Permission
from app.modules.identity.models.role import Role
from app.modules.identity.models.role_permission import RolePermission
from app.modules.identity.models.user import User
from app.modules.identity.models.user_role import UserRole
from app.core.security import Security


app = create_app()


with app.app_context():

    admin_permissions = [
        {
            "code": "USER_CREATE",
            "name": "User Create",
            "resource": "USER",
            "action": "CREATE",
            "description": "Create a new employee account.",
        },
        {
            "code": "USER_READ",
            "name": "User Read",
            "resource": "USER",
            "action": "READ",
            "description": "View employee accounts.",
        },
        {
            "code": "USER_UPDATE",
            "name": "User Update",
            "resource": "USER",
            "action": "UPDATE",
            "description": "Update employee account information.",
        },
        {
            "code": "USER_DISABLE",
            "name": "User Disable",
            "resource": "USER",
            "action": "DISABLE",
            "description": "Disable an employee account.",
        },
        {
            "code": "ROLE_ASSIGN",
            "name": "Role Assign",
            "resource": "ROLE",
            "action": "ASSIGN",
            "description": "Assign roles to employees.",
        },
        {
            "code": "ROLE_READ",
            "name": "Role Read",
            "resource": "ROLE",
            "action": "READ",
            "description": "View available roles.",
        },
        {
            "code": "PERMISSION_READ",
            "name": "Permission Read",
            "resource": "PERMISSION",
            "action": "READ",
            "description": "View system permissions.",
        },
    ]

    permissions = {}

    for item in admin_permissions:

        permission = Permission.query.filter_by(
            permission_code=item["code"]
        ).first()

        if not permission:
            permission = Permission(
                permission_name=item["name"],
                permission_code=item["code"],
                resource=item["resource"],
                action=item["action"],
                description=item["description"],
                is_active=True,
            )

            db.session.add(permission)
            db.session.flush()

        permissions[item["code"]] = permission


    admin_role = Role.query.filter_by(
        role_code="ADMIN"
    ).first()

    if not admin_role:

        admin_role = Role(
            role_name="System Administrator",
            role_code="ADMIN",
            description=(
                "Administrative role for managing "
                "employees, roles and permissions."
            ),
            is_system=True,
            is_active=True,
        )

        db.session.add(admin_role)
        db.session.flush()


    for permission in permissions.values():

        existing = RolePermission.query.filter_by(
            role_id=admin_role.id,
            permission_id=permission.id,
        ).first()

        if not existing:
            db.session.add(
                RolePermission(
                    role_id=admin_role.id,
                    permission_id=permission.id,
                )
            )


    admin_user = User.query.filter_by(
        employee_id="ADM001"
    ).first()

    if not admin_user:

        admin_user = User(
            employee_id="ADM001",
            first_name="System",
            last_name="Administrator",
            email="admin@spabank.local",
            password_hash=Security.hash_password(
                "SpaBank@123"
            ),
        )

        db.session.add(admin_user)
        db.session.flush()


    existing_user_role = UserRole.query.filter_by(
        user_id=admin_user.id,
        role_id=admin_role.id,
    ).first()

    if not existing_user_role:

        db.session.add(
            UserRole(
                user_id=admin_user.id,
                role_id=admin_role.id,
            )
        )


    db.session.commit()

    print()
    print("======================================")
    print("ADMIN RBAC SETUP COMPLETED")
    print("======================================")
    print("Employee ID:", admin_user.employee_id)
    print("Email:", admin_user.email)
    print("Role:", admin_role.role_code)
    print(
        "Permissions:",
        list(permissions.keys())
    )
    print("======================================")