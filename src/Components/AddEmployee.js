import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const AddEmployee = () => {

 
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [Salary, setSalary] = useState(0);
  const [EmployeeID, setEmployeeId] = useState(null);




  const navigate = useNavigate();
  const addemployee = () => {
    const updatedemployee = {
    EmployeeID:EmployeeID,
      name: name,
      designation: designation,
      Salary: Salary,
    };

   

    fetch(`http://localhost:8010/employee`, {
      method: "POST",
      body: JSON.stringify(updatedemployee),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/"));
  };

  return (
    <div className="FormContainer">
      <div className="innerContainer">
        <div className="indidiv">
          <label>Id</label>
          <input value={EmployeeID}   onChange={(event) => setEmployeeId(event.target.value)}/>
        </div>
        <div className="indidiv">
          <label>Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="indidiv">
          <label>Salary</label>
          <input
            value={Salary}
            onChange={(event) => setSalary(event.target.value)}
          />
        </div>
        <div className="indidiv">
          <label>Designation</label>
          <input
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
          />
        </div>

        <button onClick={addemployee} className="Savebtn">Save</button>

      </div>
    </div>
  );
};

export default AddEmployee;
