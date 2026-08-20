export type Decision = "ALLOW" | "DENY" | "STEP_UP";

export interface EvaluationResult {
  allowed: boolean;
  evaluator: string;
  metadata: Record<string, any>;
  reason: string;
  requires_step_up: boolean;
  score: number | null;
}

export interface AuthorizationResponse {
  allowed: boolean;
  decision: Decision;
  evaluator_results: Record<string, EvaluationResult>;
  metadata: Record<string, any>;
  permission_code: string;
  reason: string;
  risk_score: number | null;
  trust_score: number | null;
}

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