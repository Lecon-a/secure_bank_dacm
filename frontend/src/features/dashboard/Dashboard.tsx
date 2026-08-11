const statistics = [
  {
    label: "Total Users",
    value: "0",
    description: "Registered users",
  },
  {
    label: "Active Roles",
    value: "0",
    description: "Currently active roles",
  },
  {
    label: "Permissions",
    value: "0",
    description: "Configured permissions",
  },
  {
    label: "Access Requests",
    value: "0",
    description: "Authorization requests",
  },
];

const decisionSummary = [
  {
    label: "Allowed",
    value: "0",
  },
  {
    label: "Denied",
    value: "0",
  },
  {
    label: "Step-Up",
    value: "0",
  },
];

function Dashboard() {
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
              {stat.value}
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
              Overview of recent authorization outcomes.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {decisionSummary.map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-gray-50 p-4 text-center"
              >
                <p className="text-2xl font-bold text-gray-900">
                  {item.value}
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

        <div className="border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Access Requests
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Recent authorization activity will appear here.
          </p>
        </div>

        <div className="p-10 text-center">
          <p className="text-sm text-gray-500">
            No access requests available.
          </p>
        </div>

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

export default Dashboard;