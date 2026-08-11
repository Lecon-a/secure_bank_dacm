import { AuthorizationResponse } from "../../../api/authorizationApi";

interface Props {
  result: AuthorizationResponse | null;
}

function DecisionResult({ result }: Props) {
  if (!result) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            No decision yet
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Submit an access request to see the
            evaluation result.
          </p>
        </div>
      </div>
    );
  }

  const allowed =
    result.decision === "ALLOW";

  return (
    <div className="space-y-5">

      <div
        className={`rounded-xl border p-6 ${
          allowed
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider">
          Final Decision
        </p>

        <h3
          className={`mt-2 text-3xl font-bold ${
            allowed
              ? "text-green-700"
              : "text-red-700"
          }`}
        >
          {result.decision}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {result.reason}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <Metric
          label="Trust Score"
          value={
            result.trust_score !== undefined
              ? result.trust_score
              : "—"
          }
        />

        <Metric
          label="Risk Score"
          value={
            result.risk_score !== undefined
              ? result.risk_score
              : "—"
          }
        />

      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h4 className="font-semibold text-gray-900">
          Evaluator Results
        </h4>

        <div className="mt-4 space-y-3">
          {Object.entries(
            result.evaluator_results ?? {}
          ).map(([name, value]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
            >
              <span className="text-sm font-medium uppercase">
                {name}
              </span>

              <span className="text-xs text-gray-600">
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

interface MetricProps {
  label: string;
  value: string | number;
}

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default DecisionResult;