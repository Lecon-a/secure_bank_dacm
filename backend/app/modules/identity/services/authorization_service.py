from flask import request

from app.modules.authorization.application.decision_engine.decision_request import (
    DecisionRequest,
)

from app.modules.authorization.application.decision_engine.hybrid_decision_engine import (
    HybridDecisionEngine,
)

from app.modules.audit.services import AuditService


class AuthorizationService:

    def __init__(self):

        self.engine = HybridDecisionEngine()

    def authorize(self, dto):

        # ======================================================
        # BUILD COMPLETE DECISION REQUEST
        # ======================================================

        decision_request = DecisionRequest(
            user_id=dto.user_id,

            permission_code=dto.permission_code,
            action=dto.action,

            resource_id=dto.resource_id,
            resource_type=dto.resource_type,

            transaction_amount=dto.transaction_amount,

            ip_address=dto.ip_address,
            location=dto.location,

            device_id=dto.device_id,
            device_type=dto.device_type,

            operating_system=dto.operating_system,
            browser=dto.browser,

            session_id=dto.session_id,

            metadata=dto.metadata,
        )

        # ======================================================
        # RUN HYBRID AUTHORIZATION ENGINE
        # ======================================================

        decision = self.engine.evaluate(
            decision_request
        )

        # ======================================================
        # AUDIT AUTHORIZATION DECISION
        # ======================================================

        try:

            AuditService.log(
                event_type="AUTHORIZATION",

                action=decision_request.action,

                actor_user_id=decision_request.user_id,

                resource=decision_request.resource_type,

                resource_id=decision_request.resource_id,

                decision=decision.decision,

                reason=decision.reason,

                request_method=(
                    request.method
                    if request
                    else None
                ),

                request_path=(
                    request.path
                    if request
                    else None
                ),

                ip_address=(
                    decision_request.ip_address
                    or (
                        request.remote_addr
                        if request
                        else None
                    )
                ),

                user_agent=(
                    request.headers.get(
                        "User-Agent"
                    )
                    if request
                    else None
                ),

                event_metadata={
                    "permission_code": decision.permission_code,

                    "trust_score": decision.trust_score,

                    "risk_score": decision.risk_score,

                    "location": decision_request.location,

                    "device_id": (
                        str(decision_request.device_id)
                        if decision_request.device_id
                        else None
                    ),

                    "device_type": decision_request.device_type,

                    "operating_system": (
                        decision_request.operating_system
                    ),

                    "browser": decision_request.browser,

                    "session_id": (
                        str(decision_request.session_id)
                        if decision_request.session_id
                        else None
                    ),

                    "transaction_amount": (
                        decision_request.transaction_amount
                    ),

                    "request_metadata": (
                        decision_request.metadata
                    ),

                    "evaluator_results": (
                        self._serialize_evaluator_results(
                            decision.evaluator_results
                        )
                    ),
                },
            )

        except Exception as audit_error:

            # Audit failure must not prevent the
            # authorization decision from being returned.

            print(
                "Audit logging failed:",
                audit_error,
            )

        # ======================================================
        # RETURN ORIGINAL DECISION
        # ======================================================

        return decision

    @staticmethod
    def _serialize_evaluator_results(results):
        return {
            name: {
                "allowed": result.allowed,
                "evaluator": result.evaluator,
                "reason": result.reason,
                "requires_step_up": result.requires_step_up,
                "score": result.score,
                "metadata": result.metadata,
            }
            for name, result in results.items()
        }