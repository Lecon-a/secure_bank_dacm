from app.modules.identity.routes import user_bp

def register_blueprints(app):
    app.register_blueprint(user_bp)