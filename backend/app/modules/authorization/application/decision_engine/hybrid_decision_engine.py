from .rbac_evaluator import RBACEvaluator
from .abac_evaluator import ABACEvaluator
from .context_evaluator import ContextEvaluator
from .trust_evaluator import TrustEvaluator
from .risk_evaluator import RiskEvaluator
from .policy_evaluator import PolicyEvaluator
from .final_decision import FinalDecision

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

        if not rbac.allowed:
            return FinalDecision.deny(
                reason=rbac.reason,
                permission_code=request.permission_code,
                evaluator_results={
                    "rbac": rbac,
                },
            )

        abac = self.abac.evaluate(request)

        if not abac.allowed:
            return FinalDecision.deny(
                reason=abac.reason,
                permission_code=request.permission_code,
                evaluator_results={
                    "rbac": rbac,
                    "abac": abac,
                },
            )

        context = self.context.evaluate(request)

        if not context.allowed:
            return FinalDecision.deny(
                reason=context.reason,
                permission_code=request.permission_code,
                evaluator_results={
                    "rbac": rbac,
                    "abac": abac,
                    "context": context,
                },
            )

        trust = self.trust.evaluate(request)

        if not trust.allowed:
            return FinalDecision.deny(
                reason=trust.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                evaluator_results={
                    "rbac": rbac,
                    "abac": abac,
                    "context": context,
                    "trust": trust,
                },
            )

        risk = self.risk.evaluate(request)

        if risk.requires_step_up:
            return FinalDecision.step_up(
                reason=risk.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results={
                    "rbac": rbac,
                    "abac": abac,
                    "context": context,
                    "trust": trust,
                    "risk": risk,
                },
            )

        if not risk.allowed:
            return FinalDecision.deny(
                reason=risk.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results={
                    "rbac": rbac,
                    "abac": abac,
                    "context": context,
                    "trust": trust,
                    "risk": risk,
                },
            )

        policy = self.policy.evaluate(request)

        if not policy.allowed:
            return FinalDecision.deny(
                reason=policy.reason,
                permission_code=request.permission_code,
                trust_score=trust.score,
                risk_score=risk.score,
                evaluator_results={
                    "rbac": rbac,
                    "abac": abac,
                    "context": context,
                    "trust": trust,
                    "risk": risk,
                    "policy": policy,
                },
            )

        return FinalDecision.allow(
            reason="Access granted.",
            permission_code=request.permission_code,
            trust_score=trust.score,
            risk_score=risk.score,
            evaluator_results={
                "rbac": rbac,
                "abac": abac,
                "context": context,
                "trust": trust,
                "risk": risk,
                "policy": policy,
            },
        )