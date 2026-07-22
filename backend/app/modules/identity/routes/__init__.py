from .routes.users import user_bp
from .role_routes import role_bp
from .permission_routes import permission_bp

__all__ = ["user_bp", "role_bp", "permission_bp"]