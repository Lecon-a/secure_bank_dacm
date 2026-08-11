from flask import Flask

from app.config import Config
from app.extensions import db, jwt, migrate, cors
from app.routes import register_blueprints

# Import models so SQLAlchemy registers them
from app.modules.identity.models import (
    User,
    Role,
    UserRole,
    RolePermission,
    Permission,
)

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
    cors.init_app(app)

    # Register application blueprints
    register_blueprints(app)
    app.register_blueprint(role_bp)
    app.register_blueprint(authorization_bp)

    return app