import { FormEvent, useState } from "react";

import DecisionSummary from "../../../components/authorization/DecisionSummary";
import EvaluatorResults from "../../../components/authorization/EvaluatorResults";

import {
  evaluateAuthorization,
  AuthorizationResponse,
} from "../../../api/authorizationApi";

interface Props {
  onResult: (result: AuthorizationResponse) => void;
}

function AuthorizationForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);

  const [result, setResult] =
  useState<AuthorizationResponse | null>(null);

  const [form, setForm] = useState({
    permission_code: "",
    action: "",
    resource_id: "",
    resource_type: "",
    transaction_amount: "",
    ip_address: "",
    location: "",
    device_type: "",
    operating_system: "",
    browser: "",
  });

  function updateField(
    field: string,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

 async function handleSubmit(
  event: FormEvent
) {
  event.preventDefault();

  setLoading(true);

  try {
    const response =
      await evaluateAuthorization({
        ...form,
        transaction_amount:
          Number(form.transaction_amount) || 0,
      });

    setResult(response);

    onResult(response);
  } catch (error) {
    console.error(
      "Authorization evaluation failed:",
      error
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
            {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Access Request
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Submit an access request to the hybrid
          authorization engine.
        </p>
      </div>

      {/* Identity */}
      <section className="rounded-xl border bg-white p-5">
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900">
            Identity & Permission
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Identify the user and the permission being requested.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <Input
            label="Permission Code"
            placeholder="ACCOUNT_READ"
            value={form.permission_code}
            onChange={(value) =>
              updateField(
                "permission_code",
                value
              )
            }
            required
          />

          <Input
            label="Action"
            placeholder="READ"
            value={form.action}
            onChange={(value) =>
              updateField("action", value)
            }
            required
          />
        </div>
      </section>

      {/* Resource */}
      <section className="rounded-xl border bg-white p-5">
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900">
            Resource
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Specify the resource the user is attempting to access.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Resource ID"
            placeholder="Resource UUID"
            value={form.resource_id}
            onChange={(value) =>
              updateField(
                "resource_id",
                value
              )
            }
          />

          <Input
            label="Resource Type"
            placeholder="ACCOUNT"
            value={form.resource_type}
            onChange={(value) =>
              updateField(
                "resource_type",
                value
              )
            }
          />
        </div>
      </section>

      {/* Transaction */}
      <section className="rounded-xl border bg-white p-5">
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900">
            Transaction
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Provide transaction information used by risk
            and policy evaluation.
          </p>
        </div>

        <Input
          label="Transaction Amount"
          type="number"
          placeholder="0"
          value={form.transaction_amount}
          onChange={(value) =>
            updateField(
              "transaction_amount",
              value
            )
          }
        />
      </section>

      {/* Context */}
      <section className="rounded-xl border bg-white p-5">
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900">
            Context
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Contextual information used to evaluate the
            access request.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="IP Address"
            placeholder="127.0.0.1"
            value={form.ip_address}
            onChange={(value) =>
              updateField(
                "ip_address",
                value
              )
            }
          />

          <Input
            label="Location"
            placeholder="Head Office"
            value={form.location}
            onChange={(value) =>
              updateField(
                "location",
                value
              )
            }
          />

          <Input
            label="Device Type"
            placeholder="Desktop"
            value={form.device_type}
            onChange={(value) =>
              updateField(
                "device_type",
                value
              )
            }
          />

          <Input
            label="Operating System"
            placeholder="macOS"
            value={form.operating_system}
            onChange={(value) =>
              updateField(
                "operating_system",
                value
              )
            }
          />

          <Input
            label="Browser"
            placeholder="Chrome"
            value={form.browser}
            onChange={(value) =>
              updateField(
                "browser",
                value
              )
            }
          />
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Evaluating..."
            : "Evaluate Access"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 pt-4">
          <DecisionSummary
            result={result}
          />

          <EvaluatorResults
            results={result.evaluator_results}
          />
        </div>
      )}
    </form>
  );
}

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function Input({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />
    </div>
  );
}

export default AuthorizationForm;