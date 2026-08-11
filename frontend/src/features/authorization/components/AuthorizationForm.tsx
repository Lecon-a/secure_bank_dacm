import { FormEvent, useState } from "react";

import {
  evaluateAuthorization,
  AuthorizationResponse,
} from "../../../api/authorizationApi";

interface Props {
  onResult: (result: AuthorizationResponse) => void;
}

function AuthorizationForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
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
      const result =
        await evaluateAuthorization({
          ...form,
          transaction_amount:
            Number(form.transaction_amount) || 0,
        });

      onResult(result);
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
      <div>
        <h3 className="text-lg font-semibold">
          Access Request
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Submit an access request to the hybrid
          authorization engine.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          label="User ID"
          value={form.user_id}
          onChange={(value) =>
            updateField("user_id", value)
          }
          required
        />

        <Input
          label="Permission Code"
          placeholder="LOAN_APPROVE"
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
          placeholder="APPROVE"
          value={form.action}
          onChange={(value) =>
            updateField("action", value)
          }
          required
        />

        <Input
          label="Resource ID"
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
          placeholder="Loan"
          value={form.resource_type}
          onChange={(value) =>
            updateField(
              "resource_type",
              value
            )
          }
        />

        <Input
          label="Transaction Amount"
          type="number"
          placeholder="10000000"
          value={form.transaction_amount}
          onChange={(value) =>
            updateField(
              "transaction_amount",
              value
            )
          }
        />

        <Input
          label="IP Address"
          placeholder="192.168.1.10"
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
          placeholder="Windows 11"
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

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Evaluating..."
          : "Evaluate Access"}
      </button>
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