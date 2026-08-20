import { useEffect, useState } from "react";

import {
  AuditLog,
  getAuditLogs,
} from "../../api/auditApi";

function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [decision, setDecision] =
    useState("");

  const [eventType, setEventType] =
    useState("");

  const [resource, setResource] =
    useState("");

  const [action, setAction] =
    useState("");

  async function loadAuditLogs() {
    try {
      setLoading(true);
      setError(null);

      const data = await getAuditLogs({
        decision: decision || undefined,
        event_type: eventType || undefined,
        resource: resource || undefined,
        action: action || undefined,
        limit: 100,
      });

      setLogs(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load audit records."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAuditLogs();
  }, [
    decision,
    eventType,
    resource,
    action,
  ]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Audit Logs
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor employee activities and
          authorization decisions.
        </p>
      </div>

      {/* Filters */}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

          {/* Event */}

          <select
            value={eventType}
            onChange={(e) =>
              setEventType(e.target.value)
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">
              All events
            </option>

            <option value="AUTHORIZATION">
              Authorization
            </option>

            <option value="TEST">
              Test
            </option>
          </select>

          {/* Decision */}

          <select
            value={decision}
            onChange={(e) =>
              setDecision(e.target.value)
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">
              All decisions
            </option>

            <option value="ALLOW">
              Allowed
            </option>

            <option value="DENY">
              Denied
            </option>

            <option value="STEP_UP">
              Step-up
            </option>

            <option value="REVIEW">
              Review
            </option>

            <option value="SUCCESS">
              Success
            </option>
          </select>

          {/* Resource */}

          <input
            type="text"
            value={resource}
            onChange={(e) =>
              setResource(e.target.value)
            }
            placeholder="Resource"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />

          {/* Action */}

          <input
            type="text"
            value={action}
            onChange={(e) =>
              setAction(e.target.value)
            }
            placeholder="Action"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />

          {/* Refresh */}

          <button
            type="button"
            onClick={loadAuditLogs}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Refresh
          </button>

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-4">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Activity Records
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {loading
                  ? "Loading records..."
                  : `${logs.length} record${
                      logs.length === 1
                        ? ""
                        : "s"
                    }`}
              </p>
            </div>

          </div>

        </div>

        {loading ? (

          <div className="p-10 text-center text-sm text-gray-500">
            Loading audit records...
          </div>

        ) : logs.length === 0 ? (

          <div className="p-10 text-center text-sm text-gray-500">
            No audit records found.
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
                    Event
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
                    Reason
                  </th>

                  <th className="px-6 py-3 text-left font-medium text-gray-500">
                    Time
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {logs.map((log) => (

                  <tr
                    key={log.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <div className="font-medium text-gray-900">
                        {log.actor_employee_id ||
                          "System"}
                      </div>

                      {log.actor_user_id && (
                        <div className="mt-1 text-xs text-gray-400">
                          {log.actor_user_id}
                        </div>
                      )}

                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {log.event_type}
                      </span>

                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {log.action}
                    </td>

                    <td className="px-6 py-4">

                      <div className="font-medium text-gray-700">
                        {log.resource || "—"}
                      </div>

                      {log.resource_id && (
                        <div className="mt-1 text-xs text-gray-400">
                          {log.resource_id}
                        </div>
                      )}

                    </td>

                    <td className="px-6 py-4">
                      <DecisionBadge
                        decision={log.decision}
                      />
                    </td>

                    <td className="max-w-sm px-6 py-4">

                      <span
                        className="block truncate text-gray-600"
                        title={log.reason || ""}
                      >
                        {log.reason || "—"}
                      </span>

                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">

                      {log.created_at
                        ? new Date(
                            log.created_at
                          ).toLocaleString()
                        : "—"}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

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
      : decision === "REVIEW"
      ? "bg-orange-100 text-orange-700"
      : decision === "SUCCESS"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${classes}`}
    >
      {decision || "—"}
    </span>
  );
}

export default AuditPage;