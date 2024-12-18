import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
require("../assets/css/courseHistory.css");

function CourseHistory() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_courseHistory/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]); //we put the id in the dependency array to ensure that the data updates when the id changes

  return (
    <div className="container-fluid vw-100 bg-primary">
      <div className="courseHistoryContent">
        <br></br>
        <h1 className="courseHistoryTitle">
          Courses History for Student ID: {id}
        </h1>
        {data.map((course) => {
          return (
            <div>
              <div className="courseInfo">
              <ul className="list-group">
                <li classname="list-group-item">
                  {course.courseName} {"-"} {course.courseCode}
                </li>
              </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseHistory;
