import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
//import 'bootstrap/dist/css/boorstrap.min.css'

function NewCourse() {
    const [values, setValues] = useState({
        courseName: "",
        courseCode: "",
        
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
            <div className='d-flex justify-content-end'>
                <Link to='/' class='btn btn-success'>Home</Link>
            </div>
            <form onSubmit = {handleSubmit}> 
                <div className="form-group my-3">
                    <label>Course Name</label>
                    <input type='text' name='courseName' required onChange={(e) => setValues({...values, courseName: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Course Code</label>
                    <input type='text' name='courseCode' required onChange={(e) => setValues({...values, courseCode: e.target.value})}></input>
                </div>
                <div className='form-group my-3'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form> 
        </div>  
        </div> 
    )
} export default NewCourse

