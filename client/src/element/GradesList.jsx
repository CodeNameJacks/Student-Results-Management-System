import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
require("../assets/css/gradesList.css");

function GradesList() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { courseName } = useParams();
  const { courseCode } = useParams();

  useEffect(() => {
    //axios.get('/students/$id') - use this line if want to get a specific student by id
    axios
      .get(`/get_gradesByCourseID/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container-fluid vw-100 bg-primary">
      <br></br>
      <h1 className="gradesListTitle">
        Grades History for Course: {courseName}
      </h1>
      <table className="gradesTable">
        <tr>
          <th style={{ width: "60%" }}>Student Name</th>
          <th style={{ width: "15%" }}> Grade</th>
          <th style={{ width: "30%" }}> Year Completed</th>
        </tr>
        <tbody>
          {data.map((grade) => {
            return (
              <tr>
                <td>
                  {grade.studentFName} {grade.studentLName}
                </td>
                <td> {grade.grade}</td>
                <td> {grade.year}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GradesList;
