import api from "./axios";

export interface DashboardActivity {
  id: string;
  actor_employee_id?: string | null;
  event_type: string;
  action: string;
  resource?: string | null;
  resource_id?: string | null;
  decision?: string | null;
  reason?: string | null;
  created_at?: string | null;
}

export interface DashboardSummary {
  employees: {
    total: number;
    active: number;
  };

  roles: {
    total: number;
    active: number;
  };

  permissions: {
    total: number;
    active: number;
  };

  authorization: {
    approved: number;
    denied: number;
    step_up: number;
    review: number;
  };

  recent_activity: DashboardActivity[];
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get(
    "/v1/dashboard/summary"
  );

  return response.data.data;
}