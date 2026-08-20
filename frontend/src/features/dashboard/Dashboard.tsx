import { useEffect, useState } from "react";

import {
  DashboardSummary,
  getDashboardSummary,
} from "../../api/dashboardApi";

function Dashboard() {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);

      const data = await getDashboardSummary();

      setSummary(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

 const statistics = [
    {
      label: "Total Employees",
      value: summary?.employees.total ?? 0,
      description: "Registered employees",
    },
    {
      label: "Active Roles",
      value: summary?.roles.active ?? 0,
      description: "Currently active roles",
    },
    {
      label: "Permissions",
      value: summary?.permissions.active ?? 0,
      description: "Active permissions",
    },
    {
      label: "Access Requests",
      value:
        (summary?.authorization.approved ?? 0) +
        (summary?.authorization.denied ?? 0) +
        (summary?.authorization.step_up ?? 0) +
        (summary?.authorization.review ?? 0),
      description: "Recorded authorization requests",
    },
  ];

  const decisionSummary = [
    {
      label: "Allowed",
      value: summary?.authorization.approved ?? 0,
    },
    {
      label: "Denied",
      value: summary?.authorization.denied ?? 0,
    },
    {
      label: "Step-Up",
      value: summary?.authorization.step_up ?? 0,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your intelligent access control system.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Statistics */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {loading ? "—" : stat.value}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Authorization Summary */}

      <div className="grid gap-6 lg:grid-cols-2">

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Authorization Decisions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Overview of authorization outcomes.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">

            {decisionSummary.map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-gray-50 p-4 text-center"
              >
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "—" : item.value}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* System Status */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              System Status
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Current framework components.
            </p>
          </div>

          <div className="space-y-4">

            <StatusItem
              label="Authentication"
              status="Operational"
            />

            <StatusItem
              label="RBAC Engine"
              status="Operational"
            />

            <StatusItem
              label="ABAC Engine"
              status="Operational"
            />

            <StatusItem
              label="Trust Engine"
              status="Operational"
            />

            <StatusItem
              label="Risk Engine"
              status="Operational"
            />

            <StatusItem
              label="Policy Engine"
              status="Operational"
            />

          </div>

        </section>

      </div>

      {/* Recent Requests */}

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">

  <div className="flex items-center justify-between border-b border-gray-200 p-6">

    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Recent Access Requests
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Recent authorization activity.
      </p>
    </div>

    <a
      href="/audit"
      className="text-sm font-medium text-gray-700 hover:underline"
    >
      View all
    </a>

  </div>

  {loading ? (
    <div className="p-10 text-center">
      <p className="text-sm text-gray-500">
        Loading activity...
      </p>
    </div>
  ) : !summary?.recent_activity.length ? (
    <div className="p-10 text-center">
      <p className="text-sm text-gray-500">
        No access requests available.
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto">

      <table className="min-w-full text-sm">

        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Employee
            </th>

            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Action
            </th>

            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Resource
            </th>

            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Decision
            </th>

            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Time
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {summary.recent_activity.map((activity) => (
            <tr
              key={activity.id}
              className="hover:bg-gray-50"
            >

              <td className="px-6 py-4">
                {activity.actor_employee_id || "System"}
              </td>

              <td className="px-6 py-4">
                {activity.action}
              </td>

              <td className="px-6 py-4">
                {activity.resource || "—"}
              </td>

              <td className="px-6 py-4">
                <DecisionBadge
                  decision={activity.decision}
                />
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                {activity.created_at
                  ? new Date(
                      activity.created_at
                    ).toLocaleString()
                  : "—"}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )}

      </section>

    </div>
  );
}

interface StatusItemProps {
  label: string;
  status: string;
}

function StatusItem({
  label,
  status,
}: StatusItemProps) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-sm text-gray-700">
        {label}
      </span>

      <span className="flex items-center gap-2 text-xs font-medium text-gray-600">

        <span className="h-2 w-2 rounded-full bg-green-500" />

        {status}

      </span>

    </div>
  );
}

interface DecisionBadgeProps {
  decision?: string | null;
}

function DecisionBadge({
  decision,
}: DecisionBadgeProps) {

  const classes =
    decision === "ALLOW"
      ? "bg-green-100 text-green-700"
      : decision === "DENY"
      ? "bg-red-100 text-red-700"
      : decision === "STEP_UP"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${classes}`}
    >
      {decision || "UNKNOWN"}
    </span>
  );
}



export default Dashboard;