import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
//import 'bootstrap/dist/css/boorstrap.min.css'
require('../assets/css/newCourse.css');

function NewCourse() {
    const [values, setValues] = useState({
        courseName: "",
        courseCode: "",
        instructor:""
        
    })

    function handleSubmit(e) {
        e.preventDefault() //prevent default orm sumission behaviour
        
        axios.post('/add_course', values)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
    };


    return (
        <div className = 'container vh-100 vw-100 bg-primary'> 
        <div className='row'>
            <form onSubmit = {handleSubmit}> 
            <h1> Enter new course information:</h1><br></br>
                <div className="form-group my-3">
                    <label>Course Name</label><br></br>
                    <input type='text' name='courseName' required onChange={(e) => setValues({...values, courseName: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Course Code</label><br></br>
                    <input type='text' name='courseCode' required onChange={(e) => setValues({...values, courseCode: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Instructor</label><br></br>
                    <input type='text' name='instructor' required onChange={(e) => setValues({...values, instructor: e.target.value})}></input>
                </div>
                <br></br><br></br>
                <div id="btn" className='form-group my-3'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form> 
        </div>  
        </div> 
    )
} export default NewCourse

