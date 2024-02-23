import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';




function GradesList () {
    const [data, setData] = useState([]);
    const {id } = useParams();
    const {courseName } = useParams();
    const {courseCode } = useParams();

    useEffect(() => {
        //axios.get('/students/$id') - use this line if want to get a specific student by id 
        axios.get(`/get_gradesByCourseID/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err))
    }, [id]);


    return(
        <div className = "container-fluid vw-100 bg-primary">
            <h1> Grades History for Course: {courseCode}</h1>
            <h1>{courseName}</h1>
            <table>
                <tr>
                    <th>Student Name</th>
                    <th> Grade</th>
                    <th> Year Completed</th>
                </tr>
                <tbody>
                    {
                        data.map((grade) => {
                            return (<tr>
                                <td>{grade.studentFName} {grade.studentLName}</td>
                                <td> {grade.grade}</td>
                                <td> {grade.year}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GradesList