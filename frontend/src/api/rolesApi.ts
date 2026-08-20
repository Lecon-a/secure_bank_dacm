import api from "./axios";


// ============================================================
// ROLE TYPES
// ============================================================

export interface Role {
  id: string;
  role_name: string;
  role_code: string;
  description?: string | null;
  is_system: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}


// ============================================================
// PERMISSION TYPES
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
// USER → ROLE TYPES
// ============================================================

export interface UserRoleAssignment {
  role_id: string;
  user_id: string;
}


export interface UserAssignedRole {
  id: string;
  role_name: string;
  role_code: string;
  description?: string | null;
  is_system: boolean;
  is_active: boolean;
}


// ============================================================
// ROLE REQUEST TYPES
// ============================================================

export interface CreateRoleRequest {
  role_name: string;
  role_code: string;
  description?: string;
  is_system?: boolean;
}


export interface UpdateRoleRequest {
  role_name: string;
  description?: string;
  is_active?: boolean;
}


// ============================================================
// ROLE API
// ============================================================

export async function getRoles(): Promise<Role[]> {

  const response = await api.get(
    "/v1/roles"
  );

  return response.data.data;
}


export async function getRole(
  roleId: string
): Promise<Role> {

  const response = await api.get(
    `/v1/roles/${roleId}`
  );

  return response.data.data;
}


export async function createRole(
  data: CreateRoleRequest
): Promise<Role> {

  const response = await api.post(
    "/v1/roles",
    data
  );

  return response.data.data;
}


export async function updateRole(
  roleId: string,
  data: UpdateRoleRequest
): Promise<Role> {

  const response = await api.put(
    `/v1/roles/${roleId}`,
    data
  );

  return response.data.data;
}


export async function deactivateRole(
  roleId: string
): Promise<Role> {

  const response = await api.patch(
    `/v1/roles/${roleId}/deactivate`
  );

  return response.data.data;
}


// ============================================================
// USER → ROLE
// ============================================================

export async function assignRole(
  roleId: string,
  userId: string
): Promise<UserRoleAssignment> {

  const response = await api.post(
    `/v1/roles/${roleId}/users/${userId}`
  );

  return response.data.data;
}


export async function removeRole(
  roleId: string,
  userId: string
): Promise<UserRoleAssignment> {

  const response = await api.delete(
    `/v1/roles/${roleId}/users/${userId}`
  );

  return response.data.data;
}


export async function getUserRoles(
  userId: string
): Promise<UserAssignedRole[]> {

  const response = await api.get(
    `/v1/roles/users/${userId}/roles`
  );

  return response.data.data;
}


// ============================================================
// ROLE → PERMISSIONS
// ============================================================

export async function getRolePermissions(
  roleId: string
): Promise<Permission[]> {

  const response = await api.get(
    `/v1/roles/${roleId}/permissions`
  );

  return response.data.data;
}


export async function assignPermission(
  roleId: string,
  permissionId: string
) {

  const response = await api.post(
    `/v1/roles/${roleId}/permissions`,
    {
      permission_id: permissionId,
    }
  );

  return response.data.data;
}


export async function removePermission(
  roleId: string,
  permissionId: string
) {

  const response = await api.delete(
    `/v1/roles/${roleId}/permissions/${permissionId}`
  );

  return response.data.data;
}


// ============================================================
// ALL SYSTEM PERMISSIONS
// ============================================================

export async function getPermissions(): Promise<Permission[]> {

  const response = await api.get(
    "/v1/permissions"
  );

  return response.data.data;
}