from .health import health_bp

def register_blueprints(app):
    """Register all application blueprints."""
    app.register_blueprint(health_bp)