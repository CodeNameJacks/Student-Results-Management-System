import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
var pencil = require("../assets/fontAwesome/pencil.png");
var trash = require("../assets/fontAwesome/trash-can2.png");
var list = require("../assets/fontAwesome/list.png");
require("../assets/css/studentList.css");

function StudentList() {
  const [data, setData] = useState([]);
  let [deleted, setDeleted] = useState(true); //this cause page to reload after deletion and trigger refetch of data
  //const {id } = useParams();

  useEffect(() => {
    //axios.get('/students/$id') - use this line if want to get a specific student by id
    if (deleted) {
      setDeleted(false); //after data has been refereshed we set deleted to false
    }
    axios
      .get(`/get_students/`)
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
  }, [deleted]); //we include deleted in this dependecy array to indicate no

  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        alert(JSON.stringify(res));
        setDeleted(true);
      })
      .catch((err) => {
        alert("There was a problem deleting student. Please try again" + err);
        console.log(err);
      });
  }

  return (
    <div className="container-fluid vw-100 bg-primary">
      <div>
        <br></br>
        <h1 className="studentListTitle">Full List of Students</h1>
      </div>
      <div>
        <table className="studentTable">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Student Name</th>
              <th style={{ width: "20%" }}> DOB</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "40%" }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => {
              return (
                <tr>
                  <td style={{ "padding-left": "15px" }}>
                    {student.firstName} {} {student.lastName}
                  </td>
                  <td style={{ "padding-left": "15px" }}>
                    {" "}
                    {student.dob.substring(0, 10)}
                  </td>
                  <td style={{ "padding-left": "15px" }}> {student.email}</td>
                  <td id="links">
                    <Link className="links" to={`/Edit/${student.id}`}>
                      <img
                        src={pencil}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Link>
                    <Link className="links" to={`/ViewStudent/${student.id}`}>
                      <img
                        src={list}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Link>
                    <span
                      className="links"
                      onClick={() => handleDelete(student.id)}
                    >
                      <img
                        src={trash}
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
    </div>
  );
}

export default StudentList;
