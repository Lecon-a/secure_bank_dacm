from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)

@health_bp.route("/health")
def health():

    return jsonify({
        "status": "healthy",
        "application": "Hybrid Intelligent Access Control Framework",
        "version": "0.1.0"
    })