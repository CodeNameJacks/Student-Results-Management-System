const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const path = require('path');
//require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.unsubscribe(express.static(path.join(_dirname,"public")));

//establish connection to databsae
const db = mysql.createConnection({
  host: 'studentmgmt-db-student-mgmt-db.a.aivencloud.com'
  user: 'avnadmin'
  password: 'AVNS_Ul1fLFCrdz78zuqFNbx'
  port: '12074'
});

//create api endpoint - test is api works
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

//create listener  
app.listen(PORT, () => {
      console.log('Server listening on port 3001');
})