import api from "./axios";

export interface AuthorizationRequest {
  user_id: string;
  permission_code: string;
  action: string;
  resource_id?: string;
  resource_type?: string;
  transaction_amount?: number;
  ip_address?: string;
  location?: string;
  device_type?: string;
  operating_system?: string;
  browser?: string;
}

export interface AuthorizationResponse {
  allowed: boolean;
  decision: string;
  reason: string;

  permission_code?: string;

  trust_score?: number | null;
  risk_score?: number | null;

  evaluator_results?: Record<
    string,
    unknown
  >;

  metadata?: Record<
    string,
    unknown
  >;
}

export async function evaluateAuthorization(
  request: AuthorizationRequest
) {
  const response = await api.post<AuthorizationResponse>(
    "/authorization/evaluate",
    request
  );

  return response.data;
}