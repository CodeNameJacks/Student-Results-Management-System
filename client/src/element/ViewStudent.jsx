import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
require("../assets/css/viewStudent.css");

function ViewStudent() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_studentById/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]); //we put the id in the dependency array to ensure that the data updates when the id changes

  return (
    <div className="container-fluid vw-100 bg-primary">
      <div className="viewStudentContent">
        <h1 className="viewStudentTitle"> Student: {id}</h1>
        {data.map((student) => {
          return (
            <div>
            <div className="studentInfo">
              <ul className="list-group">
                <li classname="list-group-item">
                  {student.firstName} {} {student.lastName}
                </li>
              </ul>
              <ul className="list-group">
                <li classname="list-group-item">{student.dob}</li>
              </ul>
              <ul className="list-group">
                <li classname="list-group-item">{student.program}</li>
              </ul>
              </div>
              <div className="form-group my-3">
                <button className="viewStudentButton">
                  <a class="nav-link" href={`/GradesHistory/${student.id} - ${student.firstName} ${student.lastName}`}>
                    View Grades History
                  </a>
                </button>
                <br></br>
                <button className="viewStudentButton">
                  <a
                    class="nav-link"
                    href={`/CourseHistory/${student.id} - ${student.firstName} ${student.lastName}`}
                  >
                    View Course History
                  </a>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewStudent;
