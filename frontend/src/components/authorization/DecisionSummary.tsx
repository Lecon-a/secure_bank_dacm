import type { EvaluationResult } from "../../api/authorizationApi";

interface Props {
  results?: Record<string, EvaluationResult>;
}

const evaluatorOrder = [
  "rbac",
  "abac",
  "context",
  "trust",
  "risk",
  "policy",
];

const evaluatorLabels: Record<string, string> = {
  rbac: "Role-Based Access Control",
  abac: "Attribute-Based Access Control",
  context: "Context Evaluation",
  trust: "Trust Evaluation",
  risk: "Risk Evaluation",
  policy: "Policy Evaluation",
};

export default function DecisionSummary({
  results = {},
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Authorization Pipeline
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Evaluation results from each authorization layer.
        </p>
      </div>

      {Object.keys(results).length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            No evaluator results are available.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {evaluatorOrder.map((name, index) => {
            const result = results[name];

            if (!result) {
              return null;
            }

            const isStepUp =
              result.requires_step_up === true;

            const metadata =
              result.metadata ?? {};

            const hasScore =
              result.score !== null &&
              result.score !== undefined;

            return (
              <div key={name}>
                <div
                  className={`rounded-xl border p-4 ${
                    isStepUp
                      ? "border-yellow-200 bg-yellow-50"
                      : result.allowed
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isStepUp
                            ? "bg-yellow-200 text-yellow-800"
                            : result.allowed
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {evaluatorLabels[name] ??
                            result.evaluator}
                        </h3>

                        <p className="mt-1 text-sm text-gray-600">
                          {result.reason}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        isStepUp
                          ? "bg-yellow-200 text-yellow-800"
                          : result.allowed
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {isStepUp
                        ? "STEP-UP"
                        : result.allowed
                        ? "ALLOW"
                        : "DENY"}
                    </span>
                  </div>

                  {hasScore && (
                    <div className="mt-4 border-t border-gray-200/70 pt-3">
                      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Score
                      </span>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {result.score}
                      </p>
                    </div>
                  )}

                  {Object.keys(metadata).length > 0 && (
                    <div className="mt-4 border-t border-gray-200/70 pt-3">
                      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Details
                      </span>

                      <pre className="mt-2 overflow-auto rounded-lg bg-white/70 p-3 text-xs text-gray-700">
                        {JSON.stringify(
                          metadata,
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                </div>

                {index <
                  evaluatorOrder.length - 1 &&
                  results[
                    evaluatorOrder[index + 1]
                  ] && (
                    <div className="flex justify-center py-1">
                      <div className="h-4 w-px bg-gray-300" />
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}