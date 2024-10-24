import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var pencil = require("../assets/fontAwesome/pencil.png");
var trash = require("../assets/fontAwesome/trash-can2.png");
//var open = require("../assets/fontAwesome/folder-open2.png");
var list = require("../assets/fontAwesome/list.png");
require("../assets/css/courseList.css");

function CourseList() {
  const [data, setData] = useState([]);
  let [deleted, setDeleted] = useState(true); //this cause page to reload after deletion and trigger refetch of data
  //const {id } = useParams();

  useEffect(() => {
    if (deleted) {
      setDeleted(false); //after data has been refereshed we set deleted to false
    }
    axios
      .get(`/get_courses/`)
      .then((res) => {
        setData(res.data);
        //console.log("DATA");
        //console.log(JSON.stringify(res.data));
        if (res.data.message) {
          alert(
            "There was a problem fetching the data. Refreshe the page and try again."
          );
        }
      })
      .catch((err) => console.log(err));
  }, [deleted]); //we include deleted in this dependency array to indicate no

  function handleDelete(id) {
    axios
      .delete(`/deleteCourses/${id}`)
      .then((res) => {
        alert(JSON.stringify(res.data.message));
        setDeleted(true);
      })
      .catch((err) => {
        alert(
          "There was a problem deleting the course. Please try again" + err
        );
        console.log(err);
      });
  }

  return (
    <div className="container-fluid vw-100 bg-primary">
      <div>
        <br></br>
        <h1 className="courseListTitle">
          Course Offerings for the Academic Year
        </h1>
      </div>
      <table className="courseListTable">
        <thead>
          <tr>
            <th style={{width: "45%"}}>Course Name</th>
            <th style={{width: "30%"}}> Course Code</th>
            <th style={{ width: "60%" }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((course) => {
            return (
              <tr>
                <td>{course.courseName}</td>
                <td> {course.courseCode}</td>
                <td>
                  <Link
                    className="links"
                    to={`/EditCourse/${course.idCourses}`}
                  >
                    <img
                      src={pencil} alt="Edit course info here"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Link>
                  {/*<Link
                    className="links"
                    to={`/ViewCourse/${course.idCourses}`}
                  >
                    <img src={open} style={{ width: "20px", height: "20px" }} />
                  </Link> */}
                  <Link
                    className="links"
                    to={`/GradesList/${course.idCourses}/${course.courseName}`}
                  >
                    <img src={list} alt="View course info" style={{ width: "20px", height: "20px" }} />
                  </Link>
                  <span
                    className="links"
                    onClick={() => handleDelete(course.idCourses)}
                  >
                    <img
                      src={trash} alt="Delete course"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
