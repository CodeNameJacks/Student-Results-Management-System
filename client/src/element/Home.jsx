import React from "react";
import NavBar from "../element/NavBar";
var logo = require("../assets/images/logo.png");
var list = require("../assets/fontAwesome/list.png");
require("../assets/css/home.css");

function Home() {
  return (
    <>
      <div className="mainLogo">
        <img src={logo} />
        <center>
          <p>Student Management Registration System</p>
        </center>
      </div>
      <div className="entryButtons">
        <div className="row">
          <div className="column">
            <button>
              <a class="nav-link" href="/NewStudent">
                Add New Student
              </a>
            </button>
            <button>
              <a class="nav-link" href="/StudentList">
                Student List
              </a>
            </button>
            <button>
              <a class="nav-link" href="/NewCourse">
                Add New Course
              </a>
            </button>
          </div>
          <div className="column">
            <button>
              <a class="nav-link" href="/CourseList">
                Course List
              </a>
            </button>
            <button>
              <a class="nav-link" href="/NewGrade">
                Add New Grade
              </a>
            </button>
            <button>
              <a class="nav-link" href="/Register">
                Register for Course
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
