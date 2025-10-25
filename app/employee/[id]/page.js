"use client";
import { useQuery } from "@apollo/client/react";
import { GET_EMPLOYEE_DETAILS } from "../../../lib/graphql";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";

export default function EmployeeDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, { variables: { id } });

  if (loading) return <p className="p-4 text-center animate-pulse">Loading employee details...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading employee details</p>;

  const emp = data.getEmployeeDetails;

  return (
    <>
      <Head>
        <title>{emp.name} - Employee Details</title>
        <meta name="description" content={`Details of employee ${emp.name}`} />
      </Head>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-semibold mb-4">{emp.name}</h1>
        <div className="space-y-2">
          <p><strong>Position:</strong> {emp.position}</p>
          <p><strong>Department:</strong> {emp.department.name}</p>
          <p><strong>Floor:</strong> {emp.department.floor}</p>
          <p><strong>Salary:</strong> ${emp.salary}</p>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ← Back to Home
        </button>
      </div>
    </>
  );
}