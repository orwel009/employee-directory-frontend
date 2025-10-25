import Link from "next/link";

export default function EmployeeDetail({ params }) {
  const employee = {
    id: params.id,
    name: "Alice Johnson",
    position: "Developer",
    department: "IT",
    salary: 75000,
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">{employee.name}</h1>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Salary:</strong> ${employee.salary}</p>

      <Link
        href="/"
        className="mt-6 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}