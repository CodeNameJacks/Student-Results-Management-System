import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';
                                                         

function GradesHistory () {
    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/get_gradesHistory/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err))
    }, [id]); //we put the id in the dependency array to ensure that the data updates when the id changes

    return(
        <div>
            <h1> Grades History for Student ID: {id}</h1>    
            <div className = "container-fluid vw-100 bg-primary">
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th> Course Code</th>
                            <th>Grade</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((grades) => {
                                
                                return (<tr>
                                    <td>{grades.courseName}</td>
                                    <td> {grades.courseCode}</td>
                                    <td> {grades.grade}</td>
                                </tr>)
                            })
                        }                     
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default GradesHistory