import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';
var pencil = require('../assets/fontAwesome/pencil.png');
var trash = require('../assets/fontAwesome/trash-can2.png');
var open = require('../assets/fontAwesome/folder-open2.png');
                                    



function CourseList () {
    const [data, setData] = useState([]);
    let [deleted, setDeleted] = useState(true); //this cause page to reload after deletion and trigger refetch of data
    //const {id } = useParams();

    useEffect(() => {
        if(deleted){
            setDeleted(false); //after data has been refereshed we set deleted to false
        }
        axios.get(`/get_courses/`)
        .then((res) => {
            setData(res.data);
            //console.log("DATA");
            //console.log(JSON.stringify(res.data));
            if(res.data.message){
                alert("There was a problem fetching the data. Refreshe the page and try again.")
            }
        })
        .catch((err) => console.log(err))
    }, [deleted]); //we include deleted in this dependency array to indicate no 

    function handleDelete(id) {
        axios.delete(`/deleteCourses/${id}`)
        .then((res) => {
            alert(JSON.stringify(res.data.message));
            setDeleted(true);
        })
        .catch((err) =>{
            alert("There was a problem deleting the course. Please try again" + err);
            console.log(err);
        });
    }


    return(
        <div className = "container-fluid vw-100 bg-primary">
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th> Course Code</th>
                        <th></th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((course) => {
                            
                            return (<tr>
                                <td>{course.courseName}</td>
                                <td> {course.courseCode}</td>
                                <td> 
                                    <Link to={`/EditCourse/${course.idCourses}`}><img src={pencil}/></Link>
                                    <Link to={`/ViewCourse/${course.idCourses}`}><img src={open}/></Link>
                                    <span  onClick ={() => handleDelete(course.idCourses)}><img src = {trash}/></span>
                              </td>
                            </tr>)
                        })
                    }                     
                </tbody>
            </table>

        </div>
    )
}

export default CourseList