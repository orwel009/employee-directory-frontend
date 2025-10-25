import Link from "next/link";

export default function HomePage() {
  const employees = [
    { id: 1, name: "Alice Johnson", position: "Developer", department: "IT" },
    { id: 2, name: "Bob Smith", position: "Designer", department: "UI/UX" },
    { id: 3, name: "Carol Lee", position: "HR Manager", department: "HR" },
  ];

  const departments = ["All", "IT", "UI/UX", "HR"];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Directory</h1>

      <div className="flex justify-between items-center mb-4">
        <select className="border rounded p-2">
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
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
            <tr
              key={emp.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="p-3">
                <Link href={`/employee/${emp.id}`} className="text-blue-600 hover:underline">
                  {emp.name}
                </Link>
              </td>
              <td className="p-3">{emp.position}</td>
              <td className="p-3">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}