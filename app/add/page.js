"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_EMPLOYEE, GET_ALL_EMPLOYEES } from "../../lib/graphql";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });
  const [message, setMessage] = useState(null); // success/error message
  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [GET_ALL_EMPLOYEES],
  });
  const router = useRouter();

  const departments = [
    { id: "d1", name: "IT" },
    { id: "d2", name: "UI/UX" },
    { id: "d3", name: "HR" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!form.name || !form.position || !form.department || !form.salary) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    if (isNaN(form.salary) || Number(form.salary) <= 0) {
      setMessage({ type: "error", text: "Salary must be a positive number." });
      return;
    }

    try {
      await addEmployee({
        variables: { ...form, salary: parseFloat(form.salary) },
      });
      setMessage({ type: "success", text: "Employee added successfully!" });
      setForm({ name: "", position: "", department: "", salary: "" });

      // Optionally redirect after 1-2 seconds
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to add employee." });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-xl font-semibold mb-4">Add New Employee</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}