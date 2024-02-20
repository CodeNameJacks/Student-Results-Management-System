import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';




function EditCourse () {
    const [data, setData] = useState([]);
    const {id } = useParams();

    useEffect(() => {
        axios.get(`/get_courseById/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err))
    }, [id]);


    function handleSubmit(e) {
        e.preventDefault();
    
        axios
          .post(`/edit_course/${id}`, data[0])
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err)
          });
      }


    return (
        <div>
            <h1>Course ID: {id}</h1>
        {
            data.map((course) => {
                return (
                    <div>
                        
                            <div className = 'container vh-100 vw-100 bg-primary'> 
                                <div className='row'>
                                    <div className='d-flex justify-content-end'>
                                        <Link to='/' class='btn btn-success'>Home</Link>
                                    </div>
                                    <form onSubmit = {handleSubmit}> 
                                        <div className="form-group my-3">
                                            <label>Course Name</label>
                                            <input value={course.courseName} type='text' name='courseName' required onChange={(e) => setData([{...data[0], courseName: e.target.value}])}></input>
                                        </div>
                                        <div className="form-group my-3">
                                            <label>Lastname</label>
                                            <input value={course.courseCode} type='text' name='courseCode' required onChange={(e) => setData([{...data[0], courseCode: e.target.value}])}></input>
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
        
        

export default EditCourse