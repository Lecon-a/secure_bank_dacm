import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../features/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RolesPage from "../features/roles/RolesPage";
import AuditPage from "../features/audit/AuditPage";

import Dashboard from "../features/dashboard/Dashboard";
import AuthorizationPage from "../features/authorization/AuthorizationPage";
import UsersPage from "../features/users/UsersPage";

import PermissionsPage from "../features/permissions/PermissionsPage";



function AppRoutes() {
  return (
    <Routes>

      {/* Public Website */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Login */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Protected Banking Application */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AppLayout />}>

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
            element={<UsersPage />}
          />

          <Route
            path="/roles"
            element={<RolesPage />}
          />

          <Route
            path="/permissions"
            element={<PermissionsPage />}
          />

          <Route
            element={
              <ProtectedRoute
                permission="AUDIT_READ"
              />
            }
          >
            <Route
              path="/audit"
              element={<AuditPage />}
            />
          </Route>

        </Route>

      </Route>

    </Routes>
  );
}

export default AppRoutes;