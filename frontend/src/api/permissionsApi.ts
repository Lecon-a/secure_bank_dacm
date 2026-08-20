import api from "./axios";


// ============================================================
// PERMISSION TYPE
// ============================================================

export interface Permission {
  id: string;
  permission_name: string;
  permission_code: string;
  resource: string;
  action: string;
  description?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}


// ============================================================
// CREATE REQUEST
// ============================================================

export interface CreatePermissionRequest {
  permission_name: string;
  permission_code: string;
  resource: string;
  action: string;
  description?: string;
}


// ============================================================
// UPDATE REQUEST
// ============================================================

export interface UpdatePermissionRequest {
  permission_name: string;
  resource: string;
  action: string;
  description?: string;
  is_active?: boolean;
}


// ============================================================
// LIST PERMISSIONS
// ============================================================

export async function getPermissions(): Promise<Permission[]> {
  const response = await api.get(
    "/v1/permissions"
  );

  return response.data.data;
}


// ============================================================
// GET PERMISSION
// ============================================================

export async function getPermission(
  permissionId: string
): Promise<Permission> {

  const response = await api.get(
    `/v1/permissions/${permissionId}`
  );

  return response.data.data;
}


// ============================================================
// CREATE PERMISSION
// ============================================================

export async function createPermission(
  data: CreatePermissionRequest
): Promise<Permission> {

  const response = await api.post(
    "/v1/permissions",
    data
  );

  return response.data.data;
}


// ============================================================
// UPDATE PERMISSION
// ============================================================

export async function updatePermission(
  permissionId: string,
  data: UpdatePermissionRequest
): Promise<Permission> {

  const response = await api.put(
    `/v1/permissions/${permissionId}`,
    data
  );

  return response.data.data;
}


// ============================================================
// DEACTIVATE PERMISSION
// ============================================================

export async function deactivatePermission(
  permissionId: string
): Promise<Permission> {

  const response = await api.patch(
    `/v1/permissions/${permissionId}/deactivate`
  );

  return response.data.data;
}


// ============================================================
// SEARCH PERMISSIONS
// ============================================================

export async function searchPermissions(
  keyword: string
): Promise<Permission[]> {

  const response = await api.get(
    "/v1/permissions/search",
    {
      params: {
        keyword,
      },
    }
  );

  return response.data.data;
}