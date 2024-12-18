const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const path = require('path');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//establish connection to databsae
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'studentmgmt-db-student-mgmt-db.a.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_Ul1fLFCrdz78zuqFNbx',
  port: process.env.DB_PORT || '14074'
});

/**** STUDENT APIs ****/
//add student
app.post('/add_student', (req, res) => {
  try {
    count = 0;
    const sqlFind = "COUNT (*) FROM stumgmtdb.Students where sin = ? ";
    const sql = "INSERT INTO stumgmtdb.Students (`firstName`, `lastName`, `dob`, `email`, `sin`, `program`) VALUES (?,?,?,?,?,?)"; //inser dta into to table and binde 
    const sinVal = [req.body.sin];
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.dob,
      req.body.email,
      req.body.sin,
      req.body.program
    ]

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not add student or student already exists " + err });
      } else {
        return res.json({ message: "Student added successfully" });
      }
    });
  } catch (e) {
    console.log('Error occured add_student: ' + e);
  }

});

//delete student
app.post("/edit_student/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "UPDATE stumgmtdb.Students SET firstName = ?, lastName = ?, dob = ?, email=?, sin = ?, program = ? WHERE id = ?"; //inser dta into to table and binde 
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.dob.substring(0, 10),
      req.body.email,
      req.body.sin,
      req.body.program,
      id
    ]

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not update student" + err });
      } else {
        return res.json({ success: "Student record successfully updated" });
      }
    })
  } catch (e) {
    console.log('Error occured with edit_student: ' + e);
  }

});

//gets students
app.get('/get_students', (req, res) => {
  try {
    const sql = "SELECT id, firstName, lastName, dob, email, program FROM stumgmtdb.Students";

    db.query(sql, (err, result) => {
      if (err) {
        res.json({ mesage: "Error retrieving students. Please try again." });
      } else {
        return res.send(result);
      }

    });
  } catch (e) {
    console.log('Error occured with get_students: ' + e);
  }

});

//delete student
app.delete(`/delete/:id`, (req, res) => {
  try {
    const sql = "DELETE FROM stumgmtdb.Students WHERE id = ?";
    const values = [req.params.id];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not delete student record: " + err });
      } else {
        return res.json({ message: "Student successfully deleted" });
      }
    });
  } catch (e) {
    console.log('Error occured with delete: ' + e);
  }

});


//get student by id
app.get("/get_studentById/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM stumgmtdb.Students WHERE `id`=? ";
    const values = [id];

    db.query(sql, values, (err, result) => {
      if (err) {
        res.json({ message: "Error retrieiving informtion for that student. Please try again." + "check id: " + { id } + "ERROR: " + err });
      } else {
        return res.send(result);
      }
    })
  } catch (e) {
    console.log('Error occured get_studentById: ' + e);
  }

});

/**** COURSES APIs ****/
//add new course
app.post('/add_course', (req, res) => {
  try {
    count = 0;
    const sqlFind = "COUNT (*) FROM stumgmtdb.Courses where courseCode = ? ";
    const sql = "INSERT INTO stumgmtdb.Courses (courseName, courseCode, instructor) VALUES (?,?,?)"; //insert data into to table and bind 
    const codeVal = [req.body.courseCode];
    const values = [
      req.body.courseName,
      req.body.courseCode,
      req.body.instructor
    ]

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not add course or course already exists " + err });
      } else {
        return res.json({ message: "New course added successfully" });
      }
    });
  } catch (e) {
    console.log('Error occured with add_course: ' + e);
  }

});

//register for course
app.post('/registerInCourse', (req, res) => {
  try {
    const cd = [req.body.code];
    const sId = Number(req.body.studentId);
    const sqlCode = "SELECT idCourses FROM stumgmtdb.Courses WHERE courseCode = ? ";
    const sql = "INSERT INTO stumgmtdb.Registry (stuId, courId) VALUES (?,?)"; //insert data into to table and bind 

    db.query(sqlCode, cd, (err, result) => {
      console.log("beggining program");
      if (err) {
        return res.json({ message: "Could not add student to the course " + err });
      } else {
        let cId = Number(result[0].idCourses);

        let values = [sId, cId]
        db.query(sql, values, (err, result) => {
          if (err) {
            return res.json({ message: "Could not add student to the course " + err });
          } else {
            return res.json({ message: "Student added successfully to the course" });
          }
        })
      }
    });
  } catch (e) {
    console.log('Error occured with registerInCourse: ' + e);
  }
});


//get all courses
app.get('/get_courses', (req, res) => {
  try {
    const sql = "SELECT idCourses, courseName, courseCode FROM stumgmtdb.Courses";

    db.query(sql, (err, result) => {
      if (err) {
        res.json({ mesage: "Error retrieving students. Please try again." });
      } else {
        return res.send(result);
      }

    });
  } catch (e) {
    console.log('Error occured with get_courses: ' + e);
  }
});

//delete courses
app.delete(`/deleteCourses/:courseCode`, (req, res) => {
  try {
    const sql = "DELETE FROM stumgmtdb.Courses WHERE idCourses = ?";
    const values = [req.params.courseCode];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not delete course: " + err });
      } else {
        return res.json({ message: "Course successfully deleted" });
      }
    });
  } catch (e) {
    console.log('Error occured with deleteCourses: ' + e);
  }
});


app.get("/get_courseById/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM stumgmtdb.Courses WHERE `idCourses`=? ";
    const values = [id];

    db.query(sql, values, (err, result) => {
      if (err) {
        res.json({ message: "Error retrieiving information for that course. Please try again." + "check id: " + { id } + "ERROR: " + err });
      } else {
        return res.send(result);
      }
    })
  } catch (e) {
    console.log('Error occured with get_courseById: ' + e);
  }
});


//edit course
app.post("/edit_course/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = "UPDATE stumgmtdb.Courses SET courseName = ?, courseCode = ? WHERE idCourses = ?"; //inser dta into to table and binde 
    const values = [
      req.body.courseName,
      req.body.courseCode,
      id
    ]

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not update courset" + err });
      } else {
        return res.json({ success: "Course successfully updated" });
      }
    })
  } catch (e) {
    console.log('Error occured with edit_course: ' + e);
  }
});


app.get("/get_courseHistory/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sql = 'SELECT c.courseName, c.courseCode FROM stumgmtdb.Courses c ' +
      'INNER JOIN stumgmtdb.Registry r on c.idCourses = r.courId WHERE r.stuId = ?'

    const values = [id];

    db.query(sql, values, (err, result) => {
      if (err) {
        res.json({ message: "Error retrieiving student's course history. Please try again." + err });
      } else {
        return res.send(result);
      }
    })
  } catch (e) {
    console.log('Error occured with get_couseHistory: ' + e);
  }
});

/**** GRADES APIs ****/
app.post('/add_grade', (req, res) => {
  try {
    count = 0;
    //const sqlFind = "COUNT (*) FROM stumgmtdb.Courses where courseCode = ? ";
    const sql = "INSERT INTO stumgmtdb.Grades (studentId, studentFName, studentLName, courseId, courseCode, grade) VALUES (?,?,?,?,?,?)"; //inser dta into to table and binde 
    const codeVal = [req.body.courseCode];
    const values = [
      req.body.studentId,
      req.body.studentFName,
      req.body.studentLName,
      req.body.courseId,
      req.body.courseCode,
      req.body.grade,
      req.body.year
    ]

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ message: "Could not add grades fror thos student. Please try again. " + err });
      } else {
        return res.json({ message: "Student grade added successfully" });
      }
    });
  } catch (e) {
    console.log('Error occured with add_grade: ' + e);
  }
});


app.get("/get_gradesHistory/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT g.studentId, g.studentFName, g.studentLName, c.courseName, g.courseCode, " +
      "g.grade, g.year FROM stumgmtdb.Grades g INNER JOIN stumgmtdb.Courses c " +
      "on g.courseId = c.idCourses WHERE g.studentId =  ?;";
    const values = [id];

    db.query(sql, values, (err, result) => {
      if (err) {
        res.json({ message: "Error retrieiving grades for that student. Please try again." + err });
      } else {
        return res.send(result);
      }
    })
  } catch (e) {
    console.log('Error occured with get gradesHistory: ' + e);
  }
});


app.get("/get_gradesByCourseID/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT g.studentFName, g.studentLName, c.courseName, g.courseCode, " +
      "g.grade, g.year FROM stumgmtdb.Grades g INNER JOIN stumgmtdb.Courses c " +
      "on g.courseId = c.idCourses WHERE g.courseId =  ?;";
    const values = [id];

    db.query(sql, values, (err, result) => {
      if (err) {
        res.json({ message: "Error retrieiving grades for the course. Please try again." + err });
      } else {
        return res.send(result);
      }
    })
  } catch (e) {
    console.log('Error occured with getGradesByCourseID: ' + e);
  }
});

//use this test is server is running
app.get('/', (req, res) => {
  res.send("Server is running and appears to be working");
});

//create api endpoint - Use this to test if api works
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//create listener  
app.listen(PORT, () => {
  console.log('Server listening on port 3200');
})


