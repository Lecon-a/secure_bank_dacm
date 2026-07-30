class AuthorizationService:

    def __init__(self):

        self.engine = HybridDecisionEngine()

    def authorize(self, dto):

        request = DecisionRequest(
            user_id=dto.user_id,
            permission_code=dto.permission_code,
            action=dto.action,
            resource_id=dto.resource_id,
            resource_type=dto.resource_type,
            transaction_amount=dto.transaction_amount,
            ip_address=dto.ip_address,
            location=dto.location,
            device_type=dto.device_type,
            operating_system=dto.operating_system,
            browser=dto.browser,
        )

        return self.engine.evaluate(request)