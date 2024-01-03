import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const { id } = useParams();
  console.log(id);
  const [singleemployee, setSingleEmployee] = useState(null);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [Salary, setSalary] = useState(0);
  const getSingleEmployee = async () => {
    const res = await axios.get(`http://localhost:8010/employee/${id}`);
    console.log(res.data);
    setName(res.data.name);
    setDesignation(res.data.designation);
    setSalary(res.data.Salary)
    setSingleEmployee(res.data);
 
  };
  useEffect(() => {
    getSingleEmployee();
  }, []);



  const navigate = useNavigate();
  const editemployee = () => {
    const updatedemployee = {
      name: name,
      designation: designation,
      Salary: Salary,
    };

    // setmovieList([...movieList, newmovie]);

    //POST
    //1.METHOD-POST
    //2.

    fetch(`http://localhost:8010/employee/${id}`, {
      method: "PUT",
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
          <input value={singleemployee?.EmployeeID} />
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

        <button onClick={editemployee} className="Savebtn">Save</button>

      </div>
    </div>
  );
};

export default Form;
