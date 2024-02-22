import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
//import 'bootstrap/dist/css/boorstrap.min.css'

function Register() {
    const [values, setValues] = useState({
        studentId:"",
        firstName: "",
        lastName: "",
        code:""

    })

    function handleSubmit(e) {
        e.preventDefault() //prevent default orm sumission behaviour
        
        axios.post(`/registerInCourse`, values)
        .then((res) => {
            var mes = JSON.stringify(res.data.message);
            alert(mes);
            console.log(res);
        })
        .catch((err) => {
            alert("The student already exist. 2");
            console.log(err);
        });
    };


    return (
        <div className = 'container vh-100 vw-100 bg-primary'> 
        <div className='row'>
            <div className='d-flex justify-content-end'>
                <Link to='/' className='btn btn-success'>Home</Link>
            </div>
            <form onSubmit = {handleSubmit}> 
            <div className="form-group my-3">
                    <label>Student ID: </label>
                    <input type='text' name='studentId' required onChange={(e) => setValues({...values, studentId: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Firstname: </label>
                    <input type='text' name='firstName' required onChange={(e) => setValues({...values, firstName: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Lastname: </label>
                    <input type='text' name='lastName' required onChange={(e) => setValues({...values, lastName: e.target.value})}></input>
                </div>
                <div className="form-group my-3">
                    <label>Course Code: </label>
                    <input type='text' name='code' required onChange={(e) => setValues({...values, code: e.target.value})}></input>
                </div>
                <div className='form-group my-3'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form> 
        </div>  
        </div> 
    )
} export default Register

