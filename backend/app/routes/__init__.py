from .users import user_bp

def register_blueprints(app):
    """Register all application blueprints."""
    app.register_blueprint(user_bp)