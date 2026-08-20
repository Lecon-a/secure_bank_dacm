from flask import Blueprint, request
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from app.modules.authorization.application.decision_engine.decision_request import (
    DecisionRequest,
)
from app.modules.identity.services.authorization_service import (
    AuthorizationService,
)

authorization_bp = Blueprint(
    "authorization",
    __name__,
    url_prefix="/api/authorization",
)


@authorization_bp.post("/evaluate")
@jwt_required()
def evaluate_authorization():

    data = request.get_json() or {}

    # Get the authenticated user directly from the JWT.
    authenticated_user_id = get_jwt_identity()

    decision_request = DecisionRequest(
        user_id=authenticated_user_id,
        permission_code=data["permission_code"],
        action=data["action"],
        resource_id=data.get("resource_id"),
        resource_type=data.get("resource_type"),
        transaction_amount=data.get(
            "transaction_amount",
            0,
        ),
        ip_address=data.get("ip_address"),
        location=data.get("location"),
        device_id=data.get("device_id"),
        device_type=data.get("device_type"),
        operating_system=data.get(
            "operating_system"
        ),
        browser=data.get("browser"),
        session_id=data.get("session_id"),
        metadata=data.get("metadata"),
    )

    service = AuthorizationService()

    decision = service.authorize(
        decision_request
    )

    return {
        "allowed": decision.allowed,
        "decision": decision.decision,
        "reason": decision.reason,
        "permission_code": decision.permission_code,
        "trust_score": decision.trust_score,
        "risk_score": decision.risk_score,
        "evaluator_results": decision.evaluator_results,
        "metadata": decision.metadata,
    }, 200