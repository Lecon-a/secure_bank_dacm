from app.modules.identity.routes import user_bp
from app.modules.identity.routes.permissions import permission_bp


def register_blueprints(app):

    app.register_blueprint(user_bp)

    app.register_blueprint(permission_bp)