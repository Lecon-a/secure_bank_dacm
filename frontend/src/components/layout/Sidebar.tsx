import { NavLink } from "react-router-dom";
import { hasPermission } from "../../auth/auth";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Users",
    path: "/users",
  },
  {
    label: "Roles",
    path: "/roles",
  },
  {
    label: "Permissions",
    path: "/permissions",
  },
  {
    label: "Authorization",
    path: "/authorization",
  },
  {
    label: "Audit",
    path: "/audit",
    permission: "AUDIT_READ",
  },
];

function Sidebar() {

  const visibleNavigation =
    navigation.filter((item) => {

      if (!item.permission) {
        return true;
      }

      return hasPermission(
        item.permission
      );
    });

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">

      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h1 className="text-lg font-bold">
          HIACF
        </h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">

        {visibleNavigation.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>

        ))}

      </nav>

      <div className="border-t border-gray-200 p-4">

        <p className="text-xs text-gray-500">
          Hybrid Intelligent Access Control Framework
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;