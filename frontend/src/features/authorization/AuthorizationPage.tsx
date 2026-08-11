import { useState } from "react";

import AuthorizationForm from "./components/AuthorizationForm";
import DecisionResult from "./components/DecisionResult";

import { AuthorizationResponse } from "../../api/authorizationApi";

function AuthorizationPage() {
  const [result, setResult] =
    useState<AuthorizationResponse | null>(
      null
    );

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Authorization Simulator
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Evaluate an access request using the
          Hybrid Intelligent Access Control Framework.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <AuthorizationForm
            onResult={setResult}
          />
        </section>

        <section>
          <DecisionResult
            result={result}
          />
        </section>

      </div>

    </div>
  );
}

export default AuthorizationPage;