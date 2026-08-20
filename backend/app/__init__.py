from flask import Flask

from app.config import Config
from app.extensions import db, jwt, migrate, cors
from app.routes import register_blueprints
from app.modules.identity.routes.auth import auth_bp
from app.modules.dashboard.routes import dashboard_bp


# Import models so SQLAlchemy registers them
from app.modules.identity.models import (
    User,
    Role,
    UserRole,
    RolePermission,
    Permission,
    UserAttribute,
    TrustScore,
)
from app.modules.audit.models import AuditLog
from app.modules.audit.routes import audit_bp

# Identity routes
from app.modules.identity.routes import role_bp

# Authorization routes
from app.modules.authorization.presentation.routes.authorization_routes import (
    authorization_bp,
)


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    # cors.init_app(app)
    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                ]
            }
        }
    )

    # Register application blueprints
    register_blueprints(app)

    app.register_blueprint(role_bp)
    app.register_blueprint(authorization_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(audit_bp)
    app.register_blueprint(dashboard_bp)

    return app