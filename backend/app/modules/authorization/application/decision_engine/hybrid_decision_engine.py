from .rbac_evaluator import RBACEvaluator
from .abac_evaluator import ABACEvaluator
from .context_evaluator import ContextEvaluator
from .trust_evaluator import TrustEvaluator
from .risk_evaluator import RiskEvaluator
from .policy_evaluator import PolicyEvaluator

class HybridDecisionEngine:

    def __init__(self):

        self.rbac = RBACEvaluator()
        self.abac = ABACEvaluator()
        self.context = ContextEvaluator()
        self.trust = TrustEvaluator()
        self.risk = RiskEvaluator()
        self.policy = PolicyEvaluator()

    def evaluate(self, request):

        rbac = self.rbac.evaluate(request)
        abac = self.abac.evaluate(request)
        context = self.context.evaluate(request)
        trust = self.trust.evaluate(request)
        risk = self.risk.evaluate(request)
        policy = self.policy.evaluate(request)

        evaluator_results = {
            "rbac": rbac,
            "abac": abac,
            "context": context,
            "trust": trust,
            "risk": risk,
            "policy": policy,
        }

        if not rbac.allowed:
            return FinalDecision.deny(
                reason=rbac.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results=evaluator_results,
            )

        if not abac.allowed:
            return FinalDecision.deny(
                reason=abac.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results=evaluator_results,
            )

        if not context.allowed:
            return FinalDecision.deny(
                reason=context.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results=evaluator_results,
            )

        if not trust.allowed:
            return FinalDecision.deny(
                reason=trust.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results=evaluator_results,
            )

        if risk.requires_step_up:
            return FinalDecision.step_up(
                reason=risk.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results=evaluator_results,
            )

        if not policy.allowed:
            return FinalDecision.deny(
                reason=policy.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results=evaluator_results,
            )

        return FinalDecision.allow(
            reason="Access granted.",
            permission_code=request.permission_code,
            trust_score=trust.score,
            risk_score=risk.score,
            evaluator_results=evaluator_results,
        )