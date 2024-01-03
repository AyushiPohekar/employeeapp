import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Table.css";
const Table = () => {
  const [employees, setEmployees] = useState([]);

  const getEmployess = async () => {
    const res = await axios.get("http://localhost:8010/employee");
    console.log(res.data);
    setEmployees(res.data);
  };

  useEffect(() => {
    getEmployess();
  }, []);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(newSelectedRows);
  };

  const handleSort = (column) => {
    const sortedEmployees = [...employees].sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
    setEmployees(sortedEmployees);
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8010/employee/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      getEmployess();
    } catch (error) {}
  };
  const [query, setQuery] = useState("");
  return (
    <div className="tableContainer">
      <button onClick={() => navigate("/add")} className="Addnew">
        + Add new Employee
      </button>
      <input
        placeholder="Search Employee by name"
        onChange={(event) => setQuery(event.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => {
                  const allEmployeeIds = employees.map(
                    (employee) => employee._id
                  );
                  setSelectedRows(
                    selectedRows.length === allEmployeeIds.length
                      ? []
                      : allEmployeeIds
                  );
                }}
                checked={selectedRows.length === employees.length}
              />
            </th>
            <th>
              <FaSort onClick={() => handleSort("id")} />
              Employee ID
            </th>
            <th>
              <FaSort onClick={() => handleSort("name")} />
              Name
            </th>
            <th>
              <FaSort onClick={() => handleSort("salary")} />
              Salary
            </th>
            <th>
              <FaSort onClick={() => handleSort("designation")} />
              Designation
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees
            ?.filter((eq) => {
              if (query === "") {
                return eq;
              } else if (eq.name.toLowerCase().includes(query.toLowerCase())) {
                return eq;
              }
            })
            .map((employee) => (
              <tr key={employee._id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(employee._id)}
                    checked={selectedRows.includes(employee._id)}
                  />
                </td>
                <td>{employee.EmployeeID}</td>

                <td>{employee.name}</td>

                <td>{employee.Salary}</td>
                <td>{employee.designation}</td>

                <td>
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="editbtn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="deletebtn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
