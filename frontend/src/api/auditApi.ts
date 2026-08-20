import api from "./axios";

export interface AuditLog {
  id: string;
  actor_user_id?: string | null;
  actor_employee_id?: string | null;
  event_type: string;
  action: string;
  resource?: string | null;
  resource_id?: string | null;
  decision?: string | null;
  reason?: string | null;
  request_method?: string | null;
  request_path?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  event_metadata?: Record<string, unknown> | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AuditFilters {
  decision?: string;
  event_type?: string;
  resource?: string;
  action?: string;
  actor_user_id?: string;
  limit?: number;
}

export async function getAuditLogs(
  filters: AuditFilters = {}
): Promise<AuditLog[]> {
  const params = new URLSearchParams();

  if (filters.decision) {
    params.set("decision", filters.decision);
  }

  if (filters.event_type) {
    params.set("event_type", filters.event_type);
  }

  if (filters.resource) {
    params.set("resource", filters.resource);
  }

  if (filters.action) {
    params.set("action", filters.action);
  }

  if (filters.actor_user_id) {
    params.set(
      "actor_user_id",
      filters.actor_user_id
    );
  }

  params.set(
    "limit",
    String(filters.limit ?? 50)
  );

  const response = await api.get(
    `/v1/audit?${params.toString()}`
  );

  return response.data.data;
}

export async function getAuditLog(
  auditLogId: string
): Promise<AuditLog> {
  const response = await api.get(
    `/v1/audit/${auditLogId}`
  );

  return response.data.data;
}