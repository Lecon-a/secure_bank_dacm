import api from "./axios";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  account_status: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export async function login(
  request: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post(
    "/auth/login",
    request
  );

  return response.data.data;
}