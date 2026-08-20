import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAuthUser, logout } from "../../auth/auth";

function Topbar() {
  const navigate = useNavigate();
  const user = getAuthUser();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const initials =
    user
      ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
      : "SA";

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <p className="text-sm text-gray-500">
          Secure Access Management
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            {initials}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium">
              {user
                ? `${user.first_name} ${user.last_name}`
                : "System Administrator"}
            </p>

            <p className="text-xs text-gray-500">
              {user
                ? user.employee_id
                : "Administrator"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />

          <span className="hidden md:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;