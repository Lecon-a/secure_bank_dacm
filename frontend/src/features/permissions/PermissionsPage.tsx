import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createPermission,
  deactivatePermission,
  getPermissions,
  updatePermission,
  type Permission,
} from "../../api/permissionsApi";


// ============================================================
// MAIN PAGE
// ============================================================

function PermissionsPage() {

  const [permissions, setPermissions] =
    useState<Permission[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [editingPermission, setEditingPermission] =
    useState<Permission | null>(null);


  async function loadPermissions() {

    setLoading(true);
    setError("");

    try {

      const data =
        await getPermissions();

      setPermissions(data);

    } catch (error: any) {

      console.error(
        "Failed to load permissions:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Unable to load permissions."
      );

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {
    loadPermissions();
  }, []);


  // ==========================================================
  // FILTERED PERMISSIONS
  // ==========================================================

  const filteredPermissions =
    useMemo(() => {

      const keyword =
        search.trim().toLowerCase();

      if (!keyword) {
        return permissions;
      }

      return permissions.filter(
        (permission) =>
          permission.permission_name
            .toLowerCase()
            .includes(keyword) ||

          permission.permission_code
            .toLowerCase()
            .includes(keyword) ||

          permission.resource
            .toLowerCase()
            .includes(keyword) ||

          permission.action
            .toLowerCase()
            .includes(keyword)
      );

    }, [
      permissions,
      search,
    ]);


  // ==========================================================
  // CREATE
  // ==========================================================

  function handleCreated() {

    setShowCreateForm(false);

    loadPermissions();
  }


  // ==========================================================
  // UPDATED
  // ==========================================================

  function handleUpdated() {

    setEditingPermission(null);

    loadPermissions();
  }


  // ==========================================================
  // DEACTIVATE
  // ==========================================================

  async function handleDeactivate(
    permission: Permission
  ) {

    const confirmed =
      window.confirm(
        `Deactivate "${permission.permission_name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await deactivatePermission(
        permission.id
      );

      await loadPermissions();

    } catch (error: any) {

      console.error(
        "Failed to deactivate permission:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Unable to deactivate permission."
      );

    }
  }


  const totalPermissions =
    permissions.length;

  const activePermissions =
    permissions.filter(
      (permission) =>
        permission.is_active
    ).length;

  const inactivePermissions =
    permissions.filter(
      (permission) =>
        !permission.is_active
    ).length;

  const resources =
    new Set(
      permissions.map(
        (permission) =>
          permission.resource
      )
    ).size;


  return (
    <div className="space-y-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Permissions
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the permissions available to the banking authorization system.
          </p>

        </div>


        <button
          type="button"
          onClick={() => {

            setShowCreateForm(
              !showCreateForm
            );

            setEditingPermission(
              null
            );

            setError("");

          }}
          className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          {showCreateForm
            ? "Close"
            : "+ Create Permission"}
        </button>

      </div>


      {/* ======================================================
          CREATE FORM
      ====================================================== */}

      {showCreateForm && (

        <CreatePermissionForm
          onCreated={
            handleCreated
          }
        />

      )}


      {/* ======================================================
          EDIT FORM
      ====================================================== */}

      {editingPermission && (

        <EditPermissionForm
          permission={
            editingPermission
          }
          onUpdated={
            handleUpdated
          }
          onCancel={() =>
            setEditingPermission(
              null
            )
          }
        />

      )}


      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      {/* ======================================================
          STATISTICS
      ====================================================== */}

      {!loading && (

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Total Permissions"
            value={
              totalPermissions
            }
          />

          <StatCard
            label="Active"
            value={
              activePermissions
            }
          />

          <StatCard
            label="Inactive"
            value={
              inactivePermissions
            }
          />

          <StatCard
            label="Resources"
            value={
              resources
            }
          />

        </div>

      )}


      {/* ======================================================
          PERMISSION DIRECTORY
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center">

          <div>

            <h2 className="font-semibold text-gray-900">
              Permission Directory
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Permissions configured in SPA Bank.
            </p>

          </div>


          <div className="w-full md:w-80">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search permissions..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />

          </div>

        </div>


        {loading ? (

          <div className="p-8 text-center text-sm text-gray-500">
            Loading permissions...
          </div>

        ) : filteredPermissions.length === 0 ? (

          <div className="p-8 text-center">

            <p className="text-sm font-medium text-gray-700">
              No permissions found.
            </p>

            {search && (

              <p className="mt-1 text-xs text-gray-500">
                Try another search term.
              </p>

            )}

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Permission
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Code
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Resource
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Action
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {filteredPermissions.map(
                  (permission) => (

                    <tr
                      key={
                        permission.id
                      }
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <p className="font-semibold text-gray-900">
                          {
                            permission.permission_name
                          }
                        </p>

                        <p className="mt-1 max-w-xs text-xs text-gray-500">
                          {
                            permission.description ||
                            "No description."
                          }
                        </p>

                      </td>


                      <td className="px-6 py-4">

                        <span className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs font-medium text-gray-700">
                          {
                            permission.permission_code
                          }
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {
                            permission.resource
                          }
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {
                            permission.action
                          }
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            permission.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {
                            permission.is_active
                              ? "ACTIVE"
                              : "INACTIVE"
                          }
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => {

                              setEditingPermission(
                                permission
                              );

                              setShowCreateForm(
                                false
                              );

                              setError("");

                            }}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            Edit
                          </button>


                          {permission.is_active && (

                            <button
                              type="button"
                              onClick={() =>
                                handleDeactivate(
                                  permission
                                )
                              }
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              Deactivate
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}


// ============================================================
// CREATE PERMISSION FORM
// ============================================================

interface CreatePermissionFormProps {
  onCreated: () => void;
}


function CreatePermissionForm({
  onCreated,
}: CreatePermissionFormProps) {

  const [form, setForm] =
    useState({
      permission_name: "",
      permission_code: "",
      resource: "",
      action: "",
      description: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  function updateField(
    field: keyof typeof form,
    value: string
  ) {

    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

  }


  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      await createPermission({

        permission_name:
          form.permission_name.trim(),

        permission_code:
          form.permission_code
            .trim()
            .toUpperCase(),

        resource:
          form.resource
            .trim()
            .toUpperCase(),

        action:
          form.action
            .trim()
            .toUpperCase(),

        description:
          form.description.trim(),

      });

      setForm({
        permission_name: "",
        permission_code: "",
        resource: "",
        action: "",
        description: "",
      });

      onCreated();

    } catch (error: any) {

      console.error(
        "Permission creation failed:",
        error
      );

      const response =
        error?.response?.data;

      if (response?.errors) {

        setError(
          JSON.stringify(
            response.errors,
            null,
            2
          )
        );

      } else {

        setError(
          response?.message ||
          "Unable to create permission."
        );

      }

    } finally {

      setLoading(false);

    }
  }


  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-semibold text-gray-900">
          Create Permission
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Define a permission that can be assigned to roles.
        </p>

      </div>


      {error && (

        <div className="mb-5 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      <form
        onSubmit={
          handleSubmit
        }
        className="grid gap-5 md:grid-cols-2"
      >

        <FormField
          label="Permission Name"
          value={
            form.permission_name
          }
          placeholder="Account Read"
          required
          onChange={(value) =>
            updateField(
              "permission_name",
              value
            )
          }
        />


        <FormField
          label="Permission Code"
          value={
            form.permission_code
          }
          placeholder="ACCOUNT_READ"
          required
          onChange={(value) =>
            updateField(
              "permission_code",
              value
            )
          }
        />


        <FormField
          label="Resource"
          value={
            form.resource
          }
          placeholder="ACCOUNT"
          required
          onChange={(value) =>
            updateField(
              "resource",
              value
            )
          }
        />


        <FormField
          label="Action"
          value={
            form.action
          }
          placeholder="READ"
          required
          onChange={(value) =>
            updateField(
              "action",
              value
            )
          }
        />


        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={
              form.description
            }
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
            rows={3}
            placeholder="Describe what this permission allows."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

        </div>


        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Permission"}
          </button>

        </div>

      </form>

    </div>
  );
}


// ============================================================
// EDIT PERMISSION FORM
// ============================================================

interface EditPermissionFormProps {
  permission: Permission;
  onUpdated: () => void;
  onCancel: () => void;
}


function EditPermissionForm({
  permission,
  onUpdated,
  onCancel,
}: EditPermissionFormProps) {

  const [form, setForm] =
    useState({
      permission_name:
        permission.permission_name,

      resource:
        permission.resource,

      action:
        permission.action,

      description:
        permission.description ||
        "",

      is_active:
        permission.is_active,
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      await updatePermission(
        permission.id,
        {
          permission_name:
            form.permission_name.trim(),

          resource:
            form.resource
              .trim()
              .toUpperCase(),

          action:
            form.action
              .trim()
              .toUpperCase(),

          description:
            form.description.trim(),

          is_active:
            form.is_active,
        }
      );

      onUpdated();

    } catch (error: any) {

      console.error(
        "Permission update failed:",
        error
      );

      const response =
        error?.response?.data;

      if (response?.errors) {

        setError(
          JSON.stringify(
            response.errors,
            null,
            2
          )
        );

      } else {

        setError(
          response?.message ||
          "Unable to update permission."
        );

      }

    } finally {

      setLoading(false);

    }
  }


  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-start justify-between gap-4">

        <div>

          <h2 className="text-lg font-semibold text-gray-900">
            Edit Permission
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the permission definition.
          </p>

        </div>


        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

      </div>


      {error && (

        <div className="mb-5 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      <form
        onSubmit={
          handleSubmit
        }
        className="grid gap-5 md:grid-cols-2"
      >

        <FormField
          label="Permission Name"
          value={
            form.permission_name
          }
          required
          onChange={(value) =>
            setForm(
              (previous) => ({
                ...previous,
                permission_name:
                  value,
              })
            )
          }
        />


        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Permission Code
          </label>

          <input
            value={
              permission.permission_code
            }
            disabled
            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 font-mono text-sm text-gray-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            Permission codes cannot be changed here.
          </p>

        </div>


        <FormField
          label="Resource"
          value={
            form.resource
          }
          required
          onChange={(value) =>
            setForm(
              (previous) => ({
                ...previous,
                resource:
                  value,
              })
            )
          }
        />


        <FormField
          label="Action"
          value={
            form.action
          }
          required
          onChange={(value) =>
            setForm(
              (previous) => ({
                ...previous,
                action:
                  value,
              })
            )
          }
        />


        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={
              form.description
            }
            onChange={(event) =>
              setForm(
                (previous) => ({
                  ...previous,
                  description:
                    event.target.value,
                })
              )
            }
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

        </div>


        <div className="md:col-span-2">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={
                form.is_active
              }
              onChange={(event) =>
                setForm(
                  (previous) => ({
                    ...previous,
                    is_active:
                      event.target.checked,
                  })
                )
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            <span className="text-sm font-medium text-gray-700">
              Permission is active
            </span>

          </label>

        </div>


        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}


// ============================================================
// FORM FIELD
// ============================================================

interface FormFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    value: string
  ) => void;
}


function FormField({
  label,
  value,
  placeholder,
  required = false,
  onChange,
}: FormFieldProps) {

  return (

    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm uppercase outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />

    </div>
  );
}


// ============================================================
// STAT CARD
// ============================================================

interface StatCardProps {
  label: string;
  value: number;
}


function StatCard({
  label,
  value,
}: StatCardProps) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}


export default PermissionsPage;