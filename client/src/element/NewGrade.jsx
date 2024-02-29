import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
//import 'bootstrap/dist/css/boorstrap.min.css'

function NewGrade() {
    const [values, setValues] = useState({
        studentId: "",
        studentFName: "",
        studentLName: "",
        courseId:"",
        courseCode: "",
        grade:"",
        year: ""
    })

    function handleSubmit(e) {
        e.preventDefault() //prevent default orm sumission behaviour
        
        axios.post('/add_grade', values)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
    };


    return (
        <div className = 'container vh-100 vw-100 bg-primary'> 
        <div className='row'>
            <form onSubmit = {handleSubmit}> 
            <h1>Enter new grade for student:</h1>
                <div className="form-group my-3">
                    <label>Student ID</label><br></br>
                    <input type='text' name='studentId' required onChange={(e) => setValues({...values, studentId: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Student Firstname</label><br></br>
                    <input type='text' name='studentFName' required onChange={(e) => setValues({...values, studentFName: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Student Lastname</label><br></br>
                    <input type='text' name='studentLName' required onChange={(e) => setValues({...values, studentLName: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Course ID</label><br></br>
                    <input type='text' name='courseId' required onChange={(e) => setValues({...values, courseId: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Course Code</label><br></br>
                    <input type='text' name='courseCode' required onChange={(e) => setValues({...values, courseCode: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Grade</label><br></br>
                    <input type='text' name='grade' required onChange={(e) => setValues({...values, grade: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Year</label><br></br>
                    <input type='text' name='year' required onChange={(e) => setValues({...values, year: e.target.value})}></input>
                </div>
                <br></br>
                <div id="btn" className='form-group my-3'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form> 
        </div>  
        </div> 
    )
} export default NewGrade

