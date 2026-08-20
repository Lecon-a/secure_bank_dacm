import {
  getRolePermissions,
  getUserRoles,
} from "../api/rolesApi";

export interface AuthUser {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  account_status: string;
}

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";
const PERMISSIONS_KEY = "auth_permissions";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
}

export function getPermissions(): string[] {
  const permissions = localStorage.getItem(
    PERMISSIONS_KEY
  );

  if (!permissions) {
    return [];
  }

  try {
    return JSON.parse(permissions) as string[];
  } catch {
    return [];
  }
}

export function hasPermission(
  permission: string
): boolean {
  return getPermissions().includes(permission);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function loadUserPermissions(
  userId: string
): Promise<string[]> {

  const roles = await getUserRoles(userId);

  const permissionSet = new Set<string>();

  /*
   * We need permissions belonging to each role.
   * The role API already exposes role permissions.
   */

  const { getRolePermissions } =
    await import("../api/rolesApi");

  for (const role of roles) {

    const permissions =
      await getRolePermissions(role.id);

    for (const permission of permissions) {
      permissionSet.add(
        permission.permission_code
      );
    }
  }

  const permissions =
    Array.from(permissionSet);

  localStorage.setItem(
    PERMISSIONS_KEY,
    JSON.stringify(permissions)
  );

  return permissions;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PERMISSIONS_KEY);
}