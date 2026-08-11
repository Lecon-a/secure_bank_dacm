import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../features/dashboard/Dashboard";
import AuthorizationPage from "../features/authorization/AuthorizationPage";


function Users() {
  return <h2 className="text-2xl font-bold">Users</h2>;
}

function Roles() {
  return <h2 className="text-2xl font-bold">Roles</h2>;
}

function Permissions() {
  return <h2 className="text-2xl font-bold">Permissions</h2>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/authorization"
          element={<AuthorizationPage />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/roles"
          element={<Roles />}
        />

        <Route
          path="/permissions"
          element={<Permissions />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;