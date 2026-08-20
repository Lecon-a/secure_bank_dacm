import type { EvaluationResult } from "../../types/authorization";

interface Props {
  results: Record<string, EvaluationResult>;
}

export default function EvaluatorResults({ results }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Evaluator Results
      </h2>

      <div className="space-y-4">
        {Object.entries(results).map(([name, result]) => (
          <div
            key={name}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold uppercase">
                {name}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  result.allowed
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result.allowed ? "ALLOW" : "DENY"}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              {result.reason}
            </p>

            {result.score !== null && (
              <p className="mt-2 text-sm">
                Score: {result.score}
              </p>
            )}

            {Object.keys(result.metadata).length > 0 && (
              <pre className="mt-3 overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
                {JSON.stringify(result.metadata, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}