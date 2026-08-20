import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  isAuthenticated,
  hasPermission,
} from "../auth/auth";

interface ProtectedRouteProps {
  permission?: string;
}

function ProtectedRoute({
  permission,
}: ProtectedRouteProps) {

  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (
    permission &&
    !hasPermission(permission)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;