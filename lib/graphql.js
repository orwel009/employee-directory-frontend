import { gql } from "@apollo/client";

// Fetch all employees with department object
export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
      department {
        id
        name
      }
    }
  }
`;

// Fetch full employee details by ID
export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department {
        id
        name
        floor
      }
      salary
    }
  }
`;

// Fetch employees by department ID
export const GET_EMPLOYEES_BY_DEPARTMENT = gql`
  query GetEmployeesByDepartment($department: ID!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
      department {
        id
        name
      }
    }
  }
`;

// Mutation to add a new employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $position: String!
    $department: ID!
    $salary: Float!
  ) {
    addEmployee(
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
      name
      position
      department {
        id
        name
      }
      salary
    }
  }
`;