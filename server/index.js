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


app.post('/add_student', (req, res) => {
  count = 0;
  const sqlFind = "COUNT (*) FROM stumgmtdb.Students where sin = ? ";
  const sql = "INSERT INTO stumgmtdb.Students (`firstName`, `lastName`, `dob`, `email`, `sin`) VALUES (?,?,?,?,?)"; //inser dta into to table and binde 
  const sinVal = [req.body.sin];
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.dob,
    req.body.email,
    req.body.sin
  ]
 
  db.query(sql, values, (err,result)=> {
    if(err){
      return res.json({message: "Could not add student or student already exists " + err});
    }else {
      return res.json({message: "Student added successfully"});
    }
  });
   
});


app.post('update_student', (req, res) => {
  
  sql = "UPDATE INTO students ('name', 'lastname', 'dob', 'email') VALUES (?)"; //inser dta into to table and binde 
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.dob,
    req.body.email
  ]

  db.query(sql, values, (err,result)=> {
    if(err) { 
      return res.json({message: "Could not update student"});
    }else {
      return res.json({success: "Student record successfully updated"});
    }
  })

});

app.get('/get_students', (req, res) => {
  
  const sql = "SELECT id, firstName, lastName, dob, email FROM stumgmtdb.Students";
  
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
      return res.json({message: "Could not delete the student record: " + err});
    }else {
      return res.json({message: "Student record successfully deleted"});
    }
  });
});


app.get("/get_studentById/:id", (req, res) => {
  const id = req.params.id;
  console.log("VAL-1");
  console.log(req.params.id);
  //console.log(typeof v);
  const sql = "SELECT * FROM stumgmtdb.Students WHERE `id`=? ";
  const values = [id];
  console.log("VAL");
  console.log(values);
  console.log(typeof values);
  console.log("id = " + id);
  console.log(typeof id);
  db.query(sql, values, (err,result) => {
    if(err){
      res.json({message: "Error retrieiving informtion for that student. Please try again." +"check id: " + id  + "ERROR: " + err});
    }else{
      return res.json(result);
    }
  })
});




//create api endpoint - Use this to test is api works
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

//create listener  
app.listen(PORT, () => {
      console.log('Server listening on port 3001');
})