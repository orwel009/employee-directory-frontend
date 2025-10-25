"use client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_ALL_EMPLOYEES } from "../lib/graphql";
import { useState } from "react";

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES);
  const [filter, setFilter] = useState("");

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading employees</p>;

  const employees = data.getAllEmployees.filter((e) =>
    filter ? e.department.name === filter : true
  );

  const departments = [...new Set(data.getAllEmployees.map((e) => e.department.name))];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Directory</h1>

      <div className="flex justify-between items-center mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <Link
          href="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Employee
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Position</th>
            <th className="text-left p-3">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="p-3">
                <Link href={`/employee/${emp.id}`} className="text-blue-600 hover:underline">
                  {emp.name}
                </Link>
              </td>
              <td className="p-3">{emp.position}</td>
              <td className="p-3">{emp.department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}