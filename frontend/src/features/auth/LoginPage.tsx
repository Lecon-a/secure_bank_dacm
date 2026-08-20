import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { login } from "../../api/authApi";
import { loadUserPermissions } from "../../auth/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await login({
        identifier,
        password,
      });

      localStorage.setItem(
        "access_token",
        response.access_token
      );

      localStorage.setItem(
        "auth_user",
        JSON.stringify(response.user)
      );

      await loadUserPermissions(
        response.user.id
      );

      navigate("/dashboard");
      
    } catch (error: any) {
      console.error(
        "Login failed:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <button
            onClick={() => navigate("/")}
            className="text-left"
          >
            <h1 className="text-xl font-bold tracking-tight">
              SPA BANK PLC
            </h1>

            <p className="text-[10px] font-medium tracking-[0.2em] text-gray-500">
              BANKING FOR TOMORROW
            </p>
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Back to website
          </button>

        </div>
      </header>

      {/* Login */}
      <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Sign in to access your SPA Bank
                digital banking account.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Employee ID or Email
                </label>

                <input
                  type="text"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(
                      event.target.value
                    )
                  }
                  placeholder="EMP001 or email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-gray-500 hover:text-gray-900"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}

                {!loading && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>

            </form>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-center text-xs leading-5 text-gray-400">
                SPA Bank Plc uses multi-layer authorization
                to protect sensitive banking operations.
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default LoginPage;