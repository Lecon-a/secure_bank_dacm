import {
  useEffect,
  useState,
} from "react";

import {
  createUser,
  getUsers,
  Employee,
} from "../../api/usersApi";

import {
  getRoles,
  assignRole,
  removeRole,
  getUserRoles,
  Role,
  UserAssignedRole,
} from "../../api/rolesApi";


// ============================================================
// USERS PAGE
// ============================================================

function UsersPage() {

  const [users, setUsers] =
    useState<Employee[]>([]);

  const [roles, setRoles] =
    useState<Role[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<Employee | null>(null);

  const [error, setError] =
    useState("");


  // ==========================================================
  // LOAD USERS
  // ==========================================================

  async function loadUsers() {

    setLoading(true);
    setError("");

    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error: any) {

      console.error(
        "Failed to load employees:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to load employees."
      );

    } finally {

      setLoading(false);

    }
  }


  // ==========================================================
  // LOAD ROLES
  // ==========================================================

  async function loadRoles() {

    try {

      const data = await getRoles();

      setRoles(data);

    } catch (error) {

      console.error(
        "Failed to load roles:",
        error
      );

    }
  }


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    loadUsers();
    loadRoles();

  }, []);


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Employees
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage SPA Bank employee accounts and access.
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
            : "+ Create Employee"}

        </button>

      </div>


      {/* =====================================================
          CREATE EMPLOYEE FORM
      ===================================================== */}

      {showCreateForm && (

        <CreateEmployeeForm
          roles={roles}
          onCreated={() => {

            setShowCreateForm(false);

            loadUsers();

          }}
        />

      )}


      {/* =====================================================
          PAGE ERROR
      ===================================================== */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          {error}

        </div>

      )}


      {/* =====================================================
          EMPLOYEE DIRECTORY
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="font-semibold text-gray-900">
            Employee Directory
          </h2>

        </div>


        {loading ? (

          <div className="p-8 text-center text-sm text-gray-500">
            Loading employees...
          </div>

        ) : users.length === 0 ? (

          <div className="p-8 text-center text-sm text-gray-500">
            No employees found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Employee
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Employee ID
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold text-gray-600">
                    Access
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {users.map((user) => (

                  <tr
                    key={user.id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* =================================================
                        EMPLOYEE
                    ================================================= */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">

                          {user.first_name.charAt(0)}
                          {user.last_name.charAt(0)}

                        </div>


                        <div>

                          <p className="font-medium text-gray-900">

                            {user.first_name}{" "}
                            {user.last_name}

                          </p>


                          <p className="text-xs text-gray-500">

                            {user.phone_number ||
                              "No phone number"}

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* =================================================
                        EMPLOYEE ID
                    ================================================= */}

                    <td className="px-6 py-4 font-medium text-gray-700">

                      {user.employee_id}

                    </td>


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <td className="px-6 py-4 text-gray-600">

                      {user.email}

                    </td>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.account_status ===
                          "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {user.account_status.replace(
                          "AccountStatus.",
                          ""
                        )}

                      </span>

                    </td>


                    {/* =================================================
                        ACCESS
                    ================================================= */}

                    <td className="px-6 py-4 text-right">

                      <button
                        type="button"
                        onClick={() => {

                          setSelectedUser(user);
                          setError("");

                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-900 hover:bg-gray-50"
                      >

                        Manage Roles

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =====================================================
          ROLE MANAGEMENT MODAL
      ===================================================== */}

      {selectedUser && (

        <RoleManagementModal
          user={selectedUser}
          roles={roles}
          onClose={() => {

            setSelectedUser(null);

          }}
        />

      )}

    </div>
  );
}


// ============================================================
// ROLE MANAGEMENT MODAL
// ============================================================

interface RoleManagementModalProps {

  user: Employee;

  roles: Role[];

  onClose: () => void;

}


function RoleManagementModal({
  user,
  roles,
  onClose,
}: RoleManagementModalProps) {

  const [
    assignedRoles,
    setAssignedRoles,
  ] = useState<UserAssignedRole[]>([]);

  const [
    selectedRole,
    setSelectedRole,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  // ==========================================================
  // LOAD USER ROLES
  // ==========================================================

  async function loadUserRoles() {

    setLoading(true);
    setError("");

    try {

      const data =
        await getUserRoles(user.id);

      setAssignedRoles(data);

    } catch (error: any) {

      console.error(
        "Failed to load user roles:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to load assigned roles."
      );

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadUserRoles();

  }, [user.id]);


  // ==========================================================
  // ASSIGN ROLE
  // ==========================================================

  async function handleAssignRole() {

    if (!selectedRole) {
      return;
    }

    setActionLoading(true);
    setError("");
    setSuccess("");

    try {

      await assignRole(
        selectedRole,
        user.id
      );

      setSuccess(
        "Role assigned successfully."
      );

      setSelectedRole("");

      await loadUserRoles();

    } catch (error: any) {

      console.error(
        "Failed to assign role:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to assign role."
      );

    } finally {

      setActionLoading(false);

    }
  }


  // ==========================================================
  // REMOVE ROLE
  // ==========================================================

  async function handleRemoveRole(
    roleId: string
  ) {

    setActionLoading(true);
    setError("");
    setSuccess("");

    try {

      await removeRole(
        roleId,
        user.id
      );

      setSuccess(
        "Role removed successfully."
      );

      await loadUserRoles();

    } catch (error: any) {

      console.error(
        "Failed to remove role:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to remove role."
      );

    } finally {

      setActionLoading(false);

    }
  }


  // ==========================================================
  // AVAILABLE ROLES
  // ==========================================================

  const assignedRoleIds =
    new Set(
      assignedRoles.map(
        (role) => role.id
      )
    );


  const availableRoles =
    roles.filter(
      (role) =>
        role.is_active &&
        !assignedRoleIds.has(role.id)
    );


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">

          <div>

            <h2 className="text-lg font-semibold text-gray-900">
              Manage Roles
            </h2>

            <p className="mt-1 text-sm text-gray-500">

              {user.first_name}{" "}
              {user.last_name}
              {" · "}
              {user.employee_id}

            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-400 transition hover:text-gray-700"
            aria-label="Close"
          >

            ×

          </button>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="space-y-6 px-6 py-6">

          {/* ERROR */}

          {error && (

            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

              {error}

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

              {success}

            </div>

          )}


          {/* =================================================
              ASSIGNED ROLES
          ================================================= */}

          <div>

            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Assigned Roles
            </h3>


            {loading ? (

              <div className="rounded-lg border border-gray-200 px-4 py-4 text-sm text-gray-500">
                Loading roles...
              </div>

            ) : assignedRoles.length === 0 ? (

              <div className="rounded-lg border border-dashed border-gray-300 px-4 py-4 text-sm text-gray-500">
                No roles assigned.
              </div>

            ) : (

              <div className="space-y-2">

                {assignedRoles.map(
                  (role) => (

                    <div
                      key={role.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                    >

                      <div>

                        <p className="font-medium text-gray-900">
                          {role.role_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {role.role_code}
                        </p>

                      </div>


                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() =>
                          handleRemoveRole(
                            role.id
                          )
                        }
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        Remove

                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* =================================================
              ASSIGN ROLE
          ================================================= */}

          <div>

            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Assign Role
            </h3>


            <div className="flex gap-3">

              <select
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(
                    event.target.value
                  )
                }
                disabled={
                  loading ||
                  actionLoading ||
                  availableRoles.length === 0
                }
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
              >

                <option value="">

                  {availableRoles.length === 0
                    ? "No additional roles available"
                    : "Select a role"}

                </option>


                {availableRoles.map(
                  (role) => (

                    <option
                      key={role.id}
                      value={role.id}
                    >

                      {role.role_name} (
                      {role.role_code}
                      )

                    </option>

                  )
                )}

              </select>


              <button
                type="button"
                disabled={
                  !selectedRole ||
                  actionLoading
                }
                onClick={
                  handleAssignRole
                }
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {actionLoading
                  ? "Saving..."
                  : "Assign"}

              </button>

            </div>

          </div>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="flex justify-end border-t border-gray-200 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >

            Done

          </button>

        </div>

      </div>

    </div>

  );
}


// ============================================================
// CREATE EMPLOYEE
// ============================================================

interface CreateEmployeeFormProps {

  roles: Role[];

  onCreated: () => void;

}


function CreateEmployeeForm({
  roles,
  onCreated,
}: CreateEmployeeFormProps) {

  const [form, setForm] = useState({

    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",

  });


  const [selectedRole, setSelectedRole] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
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


  // ==========================================================
  // SUBMIT
  // ==========================================================

  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");


    try {

      /*
       * STEP 1
       * Create employee account
       */

      const employee =
        await createUser(form);


      /*
       * STEP 2
       * Assign selected role
       */

      await assignRole(
        selectedRole,
        employee.id
      );


      /*
       * STEP 3
       * Success
       */

      setSuccess(
        "Employee account and role created successfully."
      );


      /*
       * STEP 4
       * Reset form
       */

      setForm({

        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",

      });


      setSelectedRole("");


      /*
       * STEP 5
       * Refresh employee directory
       */

      onCreated();

    } catch (error: any) {

      console.error(
        "Employee creation failed:",
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
            "Unable to create employee."
        );

      }

    } finally {

      setLoading(false);

    }

  }


  // ==========================================================
  // FORM
  // ==========================================================

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* FORM HEADER */}

      <div className="mb-6">

        <h2 className="text-lg font-semibold text-gray-900">
          Create Employee
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new SPA Bank employee account and assign an access role.
        </p>

      </div>


      {/* ERROR */}

      {error && (

        <div className="mb-5 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          {error}

        </div>

      )}


      {/* SUCCESS */}

      {success && (

        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

          {success}

        </div>

      )}


      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >

        {/* EMPLOYEE ID */}

        <Field
          label="Employee ID"
          placeholder="EMP006"
          value={form.employee_id}
          onChange={(value) =>
            updateField(
              "employee_id",
              value
            )
          }
          required
        />


        {/* FIRST NAME */}

        <Field
          label="First Name"
          placeholder="John"
          value={form.first_name}
          onChange={(value) =>
            updateField(
              "first_name",
              value
            )
          }
          required
        />


        {/* LAST NAME */}

        <Field
          label="Last Name"
          placeholder="Doe"
          value={form.last_name}
          onChange={(value) =>
            updateField(
              "last_name",
              value
            )
          }
          required
        />


        {/* EMAIL */}

        <Field
          label="Email"
          type="email"
          placeholder="john.doe@spabank.com"
          value={form.email}
          onChange={(value) =>
            updateField(
              "email",
              value
            )
          }
          required
        />


        {/* PASSWORD */}

        <Field
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={(value) =>
            updateField(
              "password",
              value
            )
          }
          required
          minLength={8}
        />


        {/* PHONE */}

        <Field
          label="Phone Number"
          placeholder="08000000000"
          value={form.phone_number}
          onChange={(value) =>
            updateField(
              "phone_number",
              value
            )
          }
        />


        {/* ROLE */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Employee Role
          </label>


          <select
            value={selectedRole}
            onChange={(event) =>
              setSelectedRole(
                event.target.value
              )
            }
            required
            disabled={
              roles.length === 0
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          >

            <option value="">

              {roles.length === 0
                ? "No roles available"
                : "Select a role"}

            </option>


            {roles
              .filter(
                (role) =>
                  role.is_active
              )
              .map(
                (role) => (

                  <option
                    key={role.id}
                    value={role.id}
                  >

                    {role.role_name} (
                    {role.role_code}
                    )

                  </option>

                )
              )}

          </select>

        </div>


        {/* SUBMIT */}

        <div className="flex items-end md:col-span-2">

          <button
            type="submit"
            disabled={
              loading ||
              !selectedRole
            }
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Creating..."
              : "Create Employee"}

          </button>

        </div>

      </form>

    </div>

  );
}


// ============================================================
// REUSABLE FIELD
// ============================================================

interface FieldProps {

  label: string;

  value: string;

  placeholder?: string;

  type?: string;

  required?: boolean;

  minLength?: number;

  onChange: (
    value: string
  ) => void;

}


function Field({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  minLength,
  onChange,
}: FieldProps) {

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
        minLength={minLength}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />

    </div>

  );
}


export default UsersPage;