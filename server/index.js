const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const path = require('path');
//require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//establish connection to databsae
const db = mysql.createConnection({
  host: 'studentmgmt-db-student-mgmt-db.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_Ul1fLFCrdz78zuqFNbx',
  port: '14074'
});

/**** STUDENT APIs ****/
app.post('/add_student', (req, res) => {
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
 
  db.query(sql, values, (err,result)=> {
    if(err){
      return res.json({message: "Could not add student or student already exists " + err});
    }else {
      return res.json({message: "Student added successfully"});
    }
  });
   
});

app.post("/edit_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE stumgmtdb.Students SET firstName = ?, lastName = ?, dob = ?, email=?, sin = ?, program = ? WHERE id = ?"; //inser dta into to table and binde 
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.dob.substring(0,10),
    req.body.email,
    req.body.sin,
    req.body.program,
    id
  ]

  db.query(sql, values, (err,result)=> {
    if(err) { 
      return res.json({message: "Could not update student" + err});
    }else {
      return res.json({success: "Student record successfully updated"});
    }
  })

});

app.get('/get_students', (req, res) => {
  
  const sql = "SELECT id, firstName, lastName, dob, email, program FROM stumgmtdb.Students";
  
  db.query(sql, (err,result) => {
    if(err){
      res.json({mesage: "Error retrieving students. Please try again."});
    }else{
      return res.json(result);
    }

  });
});

app.delete(`/delete/:id`, (req, res) => {
  const sql = "DELETE FROM stumgmtdb.Students WHERE id = ?";
  const values = [req.params.id];
  
  db.query(sql, values, (err,result)=> {
    if(err) { 
      return res.json({message: "Could not delete student record: " + err});
    }else {
      return res.json({message: "Student successfully deleted"});
    }
  });
});


app.get("/get_studentById/:id", (req, res) => {
  const id = req.params.id;
  
  const sql = "SELECT * FROM stumgmtdb.Students WHERE `id`=? ";
  const values = [id];
  
  db.query(sql, values, (err,result) => {
    if(err){
      res.json({message: "Error retrieiving informtion for that student. Please try again." +"check id: " + id  + "ERROR: " + err});
    }else{
      return res.json(result);
    }
  })
});

/**** COURSES APIs ****/
app.post('/add_course', (req, res) => {
  count = 0;
  const sqlFind = "COUNT (*) FROM stumgmtdb.Courses where courseCode = ? ";
  const sql = "INSERT INTO stumgmtdb.Courses (`courseName`, `courseCode`) VALUES (?,?)"; //inser dta into to table and binde 
  const codeVal = [req.body.courseCode];
  const values = [
    req.body.courseName,
    req.body.courseCode
  ]
 
  db.query(sql, values, (err,result)=> {
    if(err){
      return res.json({message: "Could not add course or course already exists " + err});
    }else {
      return res.json({message: "New course added successfully"});
    }
  });
});


app.get('/get_courses', (req, res) => {
  
  const sql = "SELECT idCourses, courseName, courseCode FROM stumgmtdb.Courses";
  
  db.query(sql, (err,result) => {
    if(err){
      res.json({mesage: "Error retrieving students. Please try again."});
    }else{
      return res.json(result);
    }

  });
});


app.delete(`/deleteCourses/:courseCode`, (req, res) => {
  const sql = "DELETE FROM stumgmtdb.Courses WHERE idCourses = ?";
  const values = [req.params.courseCode];
  
  db.query(sql, values, (err,result)=> {
    if(err) { 
      return res.json({message: "Could not delete course: " + err});
    }else {
      return res.json({message: "Course successfully deleted"});
    }
  });
});


//create api endpoint - Use this to test is api works
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

//create listener  
app.listen(PORT, () => {
      console.log('Server listening on port 3001');
})