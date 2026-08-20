import {
  useEffect,
  useState,
} from "react";

import {
  assignPermission,
  createRole,
  getPermissions,
  getRolePermissions,
  getRoles,
  removePermission,
  type Permission,
  type Role,
} from "../../api/rolesApi";


// ============================================================
// MAIN PAGE
// ============================================================

function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  const [selectedRole, setSelectedRole] =
    useState<Role | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [error, setError] =
    useState("");


  async function loadRoles() {
    setLoading(true);
    setError("");

    try {
      const data = await getRoles();

      setRoles(data);

      // Keep selected role synchronized
      if (selectedRole) {
        const updatedRole = data.find(
          (role) =>
            role.id === selectedRole.id
        );

        if (updatedRole) {
          setSelectedRole(updatedRole);
        }
      }

    } catch (error: any) {

      console.error(
        "Failed to load roles:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to load roles."
      );

    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadRoles();
  }, []);


  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Roles
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage employee roles and access responsibilities.
          </p>

        </div>


        <button
          type="button"
          onClick={() => {
            setShowCreateForm(
              !showCreateForm
            );

            setError("");
          }}
          className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          {showCreateForm
            ? "Close"
            : "+ Create Role"}
        </button>

      </div>


      {/* =====================================================
          CREATE ROLE
      ===================================================== */}

      {showCreateForm && (

        <CreateRoleForm
          onCreated={() => {
            setShowCreateForm(false);
            loadRoles();
          }}
        />

      )}


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      {/* =====================================================
          ROLE DETAILS
      ===================================================== */}

      {selectedRole && (

        <RoleDetails
          role={selectedRole}
          onClose={() =>
            setSelectedRole(null)
          }
        />

      )}


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      {!loading && (

        <div className="grid gap-4 md:grid-cols-3">

          <StatCard
            label="Total Roles"
            value={roles.length}
          />

          <StatCard
            label="Active Roles"
            value={
              roles.filter(
                (role) =>
                  role.is_active
              ).length
            }
          />

          <StatCard
            label="System Roles"
            value={
              roles.filter(
                (role) =>
                  role.is_system
              ).length
            }
          />

        </div>

      )}


      {/* =====================================================
          ROLE DIRECTORY
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="font-semibold text-gray-900">
            Role Directory
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Roles currently configured in SPA Bank.
          </p>

        </div>


        {loading ? (

          <div className="p-8 text-center text-sm text-gray-500">
            Loading roles...
          </div>

        ) : roles.length === 0 ? (

          <div className="p-8 text-center text-sm text-gray-500">
            No roles found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Role Code
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Description
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Type
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {roles.map((role) => (

                  <tr
                    key={role.id}
                    onClick={() =>
                      setSelectedRole(role)
                    }
                    className="cursor-pointer transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-semibold text-gray-900">
                        {role.role_name}
                      </p>

                    </td>


                    <td className="px-6 py-4">

                      <span className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs font-medium text-gray-700">
                        {role.role_code}
                      </span>

                    </td>


                    <td className="max-w-sm px-6 py-4 text-gray-600">

                      {role.description ||
                        "No description provided."}

                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          role.is_system
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {role.is_system
                          ? "SYSTEM"
                          : "CUSTOM"}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          role.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {role.is_active
                          ? "ACTIVE"
                          : "INACTIVE"}
                      </span>

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


// ============================================================
// ROLE DETAILS
// ============================================================

interface RoleDetailsProps {
  role: Role;
  onClose: () => void;
}


function RoleDetails({
  role,
  onClose,
}: RoleDetailsProps) {

  const [permissions, setPermissions] =
    useState<Permission[]>([]);

  const [allPermissions, setAllPermissions] =
    useState<Permission[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [selectedPermissionId, setSelectedPermissionId] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  async function loadPermissions() {

    setLoading(true);
    setError("");

    try {

      const [
        assignedPermissions,
        systemPermissions,
      ] = await Promise.all([
        getRolePermissions(role.id),
        getPermissions(),
      ]);

      setPermissions(
        assignedPermissions
      );

      setAllPermissions(
        systemPermissions
      );

    } catch (error: any) {

      console.error(
        "Failed to load permissions:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to load role permissions."
      );

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {
    loadPermissions();
  }, [role.id]);


  async function handleAssignPermission() {

    if (!selectedPermissionId) {
      setError(
        "Please select a permission."
      );
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {

      await assignPermission(
        role.id,
        selectedPermissionId
      );

      setSelectedPermissionId("");

      setSuccess(
        "Permission assigned successfully."
      );

      await loadPermissions();

    } catch (error: any) {

      console.error(
        "Permission assignment failed:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to assign permission."
      );

    } finally {

      setSaving(false);

    }
  }


  async function handleRemovePermission(
    permissionId: string
  ) {

    const confirmed =
      window.confirm(
        "Remove this permission from the role?"
      );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {

      await removePermission(
        role.id,
        permissionId
      );

      setSuccess(
        "Permission removed successfully."
      );

      await loadPermissions();

    } catch (error: any) {

      console.error(
        "Permission removal failed:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to remove permission."
      );

    } finally {

      setSaving(false);

    }
  }


  const assignedIds =
    new Set(
      permissions.map(
        (permission) =>
          permission.id
      )
    );


  const availablePermissions =
    allPermissions.filter(
      (permission) =>
        permission.is_active &&
        !assignedIds.has(
          permission.id
        )
    );


  return (

    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

        <div>

          <div className="flex items-center gap-3">

            <h2 className="text-lg font-bold text-gray-900">
              {role.role_name}
            </h2>

            <span className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs font-medium text-gray-700">
              {role.role_code}
            </span>

          </div>

          <p className="mt-1 text-sm text-gray-500">
            {role.description ||
              "No description provided."}
          </p>

        </div>


        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Close
        </button>

      </div>


      <div className="space-y-6 p-6">

        {/* Role information */}

        <div className="grid gap-4 md:grid-cols-3">

          <InfoItem
            label="Role Code"
            value={role.role_code}
          />

          <InfoItem
            label="Type"
            value={
              role.is_system
                ? "System Role"
                : "Custom Role"
            }
          />

          <InfoItem
            label="Status"
            value={
              role.is_active
                ? "Active"
                : "Inactive"
            }
          />

        </div>


        {/* Messages */}

        {error && (

          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>

        )}


        {success && (

          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>

        )}


        {/* Add permission */}

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">

          <h3 className="font-semibold text-gray-900">
            Add Permission
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Grant an additional permission to this role.
          </p>


          <div className="mt-4 flex flex-col gap-3 sm:flex-row">

            <select
              value={selectedPermissionId}
              onChange={(event) =>
                setSelectedPermissionId(
                  event.target.value
                )
              }
              disabled={
                saving ||
                loading
              }
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            >

              <option value="">
                Select permission
              </option>

              {availablePermissions.map(
                (permission) => (

                  <option
                    key={permission.id}
                    value={permission.id}
                  >
                    {permission.permission_name} (
                    {permission.permission_code})
                  </option>

                )
              )}

            </select>


            <button
              type="button"
              onClick={
                handleAssignPermission
              }
              disabled={
                saving ||
                loading ||
                !selectedPermissionId
              }
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Add Permission"}
            </button>

          </div>

        </div>


        {/* Assigned permissions */}

        <div>

          <div className="mb-4">

            <h3 className="font-semibold text-gray-900">
              Assigned Permissions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Permissions currently granted to this role.
            </p>

          </div>


          {loading ? (

            <div className="rounded-lg border border-gray-200 p-6 text-center text-sm text-gray-500">
              Loading permissions...
            </div>

          ) : permissions.length === 0 ? (

            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">

              <p className="text-sm font-medium text-gray-700">
                No permissions assigned.
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Use the selector above to grant a permission.
              </p>

            </div>

          ) : (

            <div className="overflow-hidden rounded-lg border border-gray-200">

              <table className="w-full text-left text-sm">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Permission
                    </th>

                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Code
                    </th>

                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Resource
                    </th>

                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Action
                    </th>

                    <th className="px-5 py-3 text-right font-semibold text-gray-600">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {permissions.map(
                    (permission) => (

                      <tr
                        key={
                          permission.id
                        }
                        className="hover:bg-gray-50"
                      >

                        <td className="px-5 py-4">

                          <p className="font-semibold text-gray-900">
                            {
                              permission.permission_name
                            }
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {
                              permission.description ||
                              "No description."
                            }
                          </p>

                        </td>


                        <td className="px-5 py-4">

                          <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs font-medium text-gray-700">
                            {
                              permission.permission_code
                            }
                          </span>

                        </td>


                        <td className="px-5 py-4 text-gray-600">
                          {
                            permission.resource
                          }
                        </td>


                        <td className="px-5 py-4">

                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {
                              permission.action
                            }
                          </span>

                        </td>


                        <td className="px-5 py-4 text-right">

                          <button
                            type="button"
                            onClick={() =>
                              handleRemovePermission(
                                permission.id
                              )
                            }
                            disabled={
                              saving
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Remove
                          </button>

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

    </div>
  );
}


// ============================================================
// INFO ITEM
// ============================================================

interface InfoItemProps {
  label: string;
  value: string;
}


function InfoItem({
  label,
  value,
}: InfoItemProps) {

  return (

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-gray-900">
        {value}
      </p>

    </div>

  );
}


// ============================================================
// CREATE ROLE FORM
// ============================================================

interface CreateRoleFormProps {
  onCreated: () => void;
}


function CreateRoleForm({
  onCreated,
}: CreateRoleFormProps) {

  const [form, setForm] = useState({
    role_name: "",
    role_code: "",
    description: "",
    is_system: false,
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  function updateField(
    field: keyof typeof form,
    value: string | boolean
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
    setSuccess("");

    try {

      await createRole({

        role_name:
          form.role_name.trim(),

        role_code:
          form.role_code
            .trim()
            .toUpperCase(),

        description:
          form.description.trim(),

        is_system:
          form.is_system,

      });


      setSuccess(
        "Role created successfully."
      );


      setForm({
        role_name: "",
        role_code: "",
        description: "",
        is_system: false,
      });


      onCreated();

    } catch (error: any) {

      console.error(
        "Role creation failed:",
        error
      );


      const responseData =
        error?.response?.data;


      if (responseData?.errors) {

        setError(
          JSON.stringify(
            responseData.errors,
            null,
            2
          )
        );

      } else {

        setError(
          responseData?.message ||
            "Unable to create role."
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
          Create Role
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Define a new role for the authorization system.
        </p>

      </div>


      {error && (

        <div className="mb-5 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      {success && (

        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>

      )}


      <form
        onSubmit={
          handleSubmit
        }
        className="grid gap-5 md:grid-cols-2"
      >

        <Field
          label="Role Name"
          placeholder="Branch Manager"
          value={
            form.role_name
          }
          onChange={
            (value) =>
              updateField(
                "role_name",
                value
              )
          }
          required
        />


        <Field
          label="Role Code"
          placeholder="BRANCH_MANAGER"
          value={
            form.role_code
          }
          onChange={
            (value) =>
              updateField(
                "role_code",
                value
              )
          }
          required
        />


        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={
              form.description
            }
            onChange={
              (event) =>
                updateField(
                  "description",
                  event.target.value
                )
            }
            placeholder="Describe the responsibilities and purpose of this role."
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

        </div>


        <div className="md:col-span-2">

          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={
                form.is_system
              }
              onChange={
                (event) =>
                  updateField(
                    "is_system",
                    event.target.checked
                  )
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            <span>

              <span className="block text-sm font-medium text-gray-700">
                System role
              </span>

              <span className="block text-xs text-gray-500">
                System roles are reserved for core banking functions.
              </span>

            </span>

          </label>

        </div>


        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={
              loading
            }
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Role"}
          </button>

        </div>

      </form>

    </div>
  );
}


// ============================================================
// FIELD
// ============================================================

interface FieldProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    value: string
  ) => void;
}


function Field({
  label,
  value,
  placeholder,
  required = false,
  onChange,
}: FieldProps) {

  return (

    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={
          placeholder
        }
        required={
          required
        }
        onChange={
          (event) =>
            onChange(
              event.target.value
            )
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm uppercase outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
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


export default RolesPage;