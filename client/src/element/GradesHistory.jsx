import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
require("../assets/css/gradeHistory.css");

function GradesHistory() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_gradesHistory/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]); //we put the id in the dependency array to ensure that the data updates when the id changes

  return (
    <div className="container-fluid vw-100 bg-primary">
      <div>
        <h1 className="gradeHistoryTitle">
          Grades History for Student ID: {id}
        </h1>
        <h1></h1>
        <div className="container-fluid vw-100 bg-primary">
          <table className="gradesHistoryTable">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Course Name</th>
                <th> Course Code</th>
                <th>Grade</th>
                <th>Year Completed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((grades) => {
                return (
                  <tr>
                    <td>{grades.courseName}</td>
                    <td> {grades.courseCode}</td>
                    <td> {grades.grade}</td>
                    <td> {grades.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GradesHistory;
