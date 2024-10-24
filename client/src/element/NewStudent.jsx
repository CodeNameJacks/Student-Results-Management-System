import React, { useState } from "react";
import axios from "axios";
//import 'bootstrap/dist/css/boorstrap.min.css'
require("../assets/css/newStudent.css");

function NewStudent() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    sin: "",
    dob: "",
    email: "",
    program: "",
  });

  function handleSubmit(e) {
    e.preventDefault(); //prevent default orm sumission behaviour

    axios
      .post(`/add_student`, values)
      .then((res) => {
        var mes = JSON.stringify(res.data.message);
        alert(mes);
        console.log(res);
      })
      .catch((err) => {
        alert("The student already exists.");
        console.log(err);
      });
  }

  return (
    <div className="container vh-100 vw-100 bg-primary">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <h1 className="newStudentTitle">

            Enter information for new student:
          </h1>
          <br></br>
          <br></br>
          <div className="form-group my-3">
            <label>Firstname: </label>
            <br></br>
            <input
              type="text"
              name="firstName"
              required
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group my-3">
            <label>Lastname: </label>
            <br></br>
            <input
              type="text"
              name="lastName"
              required
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group my-3">
            <label>Date of Birth: </label>
            <br></br>
            <input
              type="text"
              name="dob"
              required
              onChange={(e) => setValues({ ...values, dob: e.target.value })}
            ></input>
          </div>
          <div className="form-group my-3">
            <label>SIN: </label>
            <br></br>
            <input
              type="text"
              name="sin"
              required
              onChange={(e) => setValues({ ...values, sin: e.target.value })}
            ></input>
          </div>
          <div className="form-group my-3">
            <label>Email Address: </label>
            <br></br>
            <input
              type="text"
              name="email"
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            ></input>
          </div>
          <div className="form-group my-3">
            <label>Program: </label>
            <br></br>
            <input
              type="text"
              name="email"
              required
              onChange={(e) =>
                setValues({ ...values, program: e.target.value })
              }
            ></input>
            <br></br>
            <br></br>
          </div>
          <div id="btn" className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewStudent;
