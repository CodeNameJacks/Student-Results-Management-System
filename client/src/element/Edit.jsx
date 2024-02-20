import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';




function Edit () {
    const [data, setData] = useState([]);
    const {id } = useParams();

    useEffect(() => {
        axios.get(`/get_studentById/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err))
    }, [id]);


    function handleSubmit(e) {
        e.preventDefault();
    
        axios
          .post(`/edit_student/${id}`, data[0])
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err)
          });
      }


    return (
        <div>
            <h1>Student ID: {id}</h1>
        {
            data.map((student) => {
                return (
                    <div>
                        
                            <div className = 'container vh-100 vw-100 bg-primary'> 
                                <div className='row'>
                                    <div className='d-flex justify-content-end'>
                                        <Link to='/' class='btn btn-success'>Home</Link>
                                    </div>
                                    <form onSubmit = {handleSubmit}> 
                                        <div className="form-group my-3">
                                            <label>Firstname</label>
                                            <input value={student.firstName} type='text' name='firstName' required onChange={(e) => setData([{...data[0], firstname: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <label>Lastname</label>
                                            <input value={student.lastName} type='text' name='lastName' required onChange={(e) => setData([{...data[0], lastname: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <label>Date of Birth</label>
                                            <input value={student.dob.substring(0,10)} type='text' name='dob' required onChange={(e) => setData([{...data[0], dob: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <label>SIN</label>
                                            <input value={student.sin} type='text' name='sin' required onChange={(e) => setData([{...data[0], sin: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <label>Email Address</label>
                                            <input value={student.email} type='text' name='email' required onChange={(e) => setData([{...data[0], email: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <label>Program</label>
                                            <input value={student.program} type='text' name='program' required onChange={(e) => setData([{...data[0], program: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <button type="submit" className="btn btn-success">Save</button>
                                        </div>
                                    </form> 
                                </div>  
                        </div>
                    </div>
                )          
            })
        }  
        </div>
    )
}        
        
        

export default Edit