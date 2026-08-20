import api from "./axios";

export interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  account_status: string;
  created_at?: string;
}

export interface CreateEmployeeRequest {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

export async function getUsers(): Promise<Employee[]> {
  const response = await api.get("/users/");

  return response.data.data;
}

export async function createUser(
  data: CreateEmployeeRequest
): Promise<Employee> {
  const response = await api.post(
    "/users/",
    data
  );

  return response.data.data;
}