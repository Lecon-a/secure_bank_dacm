from flask import Flask
from app.config import Config
from app.extensions import db, jwt, migrate, cors
from app.routes import register_blueprints
from app.models import User  # Import the User model to ensure it's registered with SQLAlchemy


def create_app():
    app = Flask(__name__)

    # Load configuration from the Config class
    app.config.from_object(Config)
    # Initialize extensions with the app
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    # register each file
    register_blueprints(app)

    return app