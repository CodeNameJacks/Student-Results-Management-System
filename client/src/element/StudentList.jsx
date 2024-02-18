import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';
var pencil = require('../assets/fontAwesome/pencil.png');
var trash = require('../assets/fontAwesome/trash-can2.png');
var open = require('../assets/fontAwesome/folder-open2.png');
                                    



function StudentList () {
    const [data, setData] = useState([]);
    let [deleted, setDeleted] = useState(true); //this cause page to reload after deletion and trigger refetch of data
    //const {id } = useParams();

    useEffect(() => {
        //axios.get('/students/$id') - use this line if want to get a specific student by id 
        if(deleted){
            setDeleted(false); //after data has been refereshed we set deleted to false
        }
        axios.get(`/get_students/`)
        .then((res) => {
            setData(res.data);
            //console.log("DATA");
            //console.log(JSON.stringify(res.data));
            if(res.data.message){
                alert("There was a problem fetching the data. Refreshe the page and try again.")
            }
        })
        .catch((err) => console.log(err))
    }, [deleted]); //we include deleted in this dependecy array to indicate no 

    function handleDelete(id) {
        axios.delete(`/delete/${id}`)
        .then((res) => {
            alert(JSON.stringify(res));
            setDeleted(true);
        })
        .catch((err) =>{
            alert("There was a problem deleting student. Please try again" + err);
            console.log(err);
        });
    }


    return(
        <div className = "container-fluid vw-100 bg-primary">
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th> DOB</th>
                        <th>Email</th>
                        <th></th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student) => {
                            
                            return (<tr>
                                <td>{student.firstName} {} {student.lastName}</td>
                                <td> {student.dob}</td>
                                <td> {student.email}</td>
                                <td> 
                                    <Link to={'/Edit/${student.id}'}><img src={pencil}/></Link>
                                    <Link to={'/OneStudent/${student.id}'}><img src={open}/></Link>
                                    <span  onClick ={() => handleDelete(student.id)}><img src = {trash}/></span>
                              </td>
                            </tr>)
                        })
                    }                     
                </tbody>
            </table>

        </div>
    )
}

export default StudentList