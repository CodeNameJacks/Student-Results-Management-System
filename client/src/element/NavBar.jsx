import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
var shortLogo = require("../assets/images/logo.png");

function NavBar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar" class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home{" "}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/NewStudent">
                Add New Student
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/StudentList">
                Student List
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/NewCourse">
                Add New Course
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/CourseList">
                Course List
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/NewGrade">
                Add New Grade
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Register">
                Register for Course
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
