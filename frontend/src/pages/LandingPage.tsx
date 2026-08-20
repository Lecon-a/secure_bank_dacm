import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Landmark,
  LockKeyhole,
} from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Landmark,
      title: "Personal Banking",
      description:
        "Manage your accounts, transfers, payments, and everyday banking from one secure platform.",
    },
    {
      icon: CreditCard,
      title: "Cards & Payments",
      description:
        "Access convenient payment services designed for secure and seamless transactions.",
    },
    {
      icon: Smartphone,
      title: "Digital Banking",
      description:
        "Bank wherever you are with a modern digital experience built around your needs.",
    },
  ];

  const securityLayers = [
    "RBAC",
    "ABAC",
    "Context",
    "Trust",
    "Risk",
    "Policy",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
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

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#services"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Services
            </a>

            <a
              href="#security"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Security
            </a>

            <a
              href="#about"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              About
            </a>
          </nav>

          <button
            onClick={() => navigate("/login")}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="overflow-hidden border-b border-gray-100">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <ShieldCheck className="h-4 w-4" />

                <span className="text-xs font-medium text-gray-600">
                  Secure digital banking
                </span>
              </div>

              <h2 className="max-w-2xl text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl">
                Banking made simple.
                <span className="block text-gray-500">
                  Security made intelligent.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Welcome to SPA Bank Plc — a modern banking experience
                designed to make everyday banking simple while protecting
                every sensitive operation.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  Login to Online Banking

                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  className="rounded-lg border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  Open an Account
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
                <span>✓ Secure access</span>
                <span>✓ Digital banking</span>
                <span>✓ Intelligent authorization</span>
              </div>
            </div>

            {/* Banking dashboard preview */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-2xl">
                <div className="rounded-xl bg-gray-900 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">
                        Available Balance
                      </p>

                      <p className="mt-2 text-3xl font-bold">
                        ₦2,450,000.00
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-700 px-3 py-2 text-xs">
                      SPA
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between text-sm">
                    <div>
                      <p className="text-xs text-gray-400">
                        Account
                      </p>

                      <p className="mt-1">
                        •••• 4821
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        Status
                      </p>

                      <p className="mt-1 text-gray-300">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-white p-4">
                    <p className="text-xs text-gray-400">
                      Recent Transfer
                    </p>

                    <p className="mt-2 font-semibold">
                      ₦150,000
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Completed
                    </p>
                  </div>

                  <div className="rounded-xl border bg-white p-4">
                    <p className="text-xs text-gray-400">
                      Security
                    </p>

                    <p className="mt-2 font-semibold">
                      Protected
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Intelligent authorization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="bg-gray-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Banking services
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need for everyday banking.
              </h2>

              <p className="mt-4 text-gray-600">
                Access essential banking services through one
                connected digital experience.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-900 text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {service.description}
                    </p>

                    <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security */}
        <section
          id="security"
          className="border-b border-gray-100"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <LockKeyhole className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  Security at every layer.
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-gray-600">
                  SPA Bank uses intelligent, multi-layer authorization
                  to evaluate sensitive access requests based on identity,
                  attributes, context, trust, risk, and policy.
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  Experience secure banking

                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {securityLayers.map((layer, index) => (
                  <div
                    key={layer}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <p className="text-xs font-medium text-gray-400">
                      0{index + 1}
                    </p>

                    <p className="mt-3 font-semibold">
                      {layer}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Authorization layer
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-b border-gray-100 bg-gray-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                About SPA Bank
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Banking designed around trust.
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                SPA Bank Plc combines modern digital banking with
                intelligent access control to help protect sensitive
                banking operations while delivering a simple experience
                for employees and customers.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="rounded-3xl bg-gray-900 px-8 py-14 text-center text-white sm:px-14">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready for a better banking experience?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Experience modern banking with security built into
                every important decision.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Login to SPA Bank

                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold">
                SPA BANK PLC
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Banking for tomorrow.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <a
                href="#services"
                className="hover:text-gray-900"
              >
                Services
              </a>

              <a
                href="#security"
                className="hover:text-gray-900"
              >
                Security
              </a>

              <a
                href="#about"
                className="hover:text-gray-900"
              >
                About
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 text-xs text-gray-400">
            © 2026 SPA Bank Plc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;