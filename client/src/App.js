import React from "react";
//import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import {} from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import logo from './logo.svg';
import './App.css';

/* Add/Import Routes */
import Home from './element/Home';
import NewStudent from './element/NewStudent'; //do this for the other components
import StudentList from "./element/StudentList";
import ViewStudent from "./element/ViewStudent";
import Edit from "./element/Edit";
import NewCourse from "./element/NewCourse";
import CourseList from "./element/CourseList";
import EditCourse from "./element/EditCourse";
import NewGrade from "./element/NewGrade";



function App() {
  //const [ data, setData] = useState("");  KEEP THIS FOR TESTING INITIAL BASE SETUP
  
  /*useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  },[]);*/

  //add other routes below - see section 6:57
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/NewStudent' element={<NewStudent/>}/> 
        <Route path='/StudentList' element={<StudentList/>}/> 
        <Route path='/ViewStudent/:id' element={<ViewStudent/>}/>
        <Route path='/Edit/:id' element={<Edit/>}/>  
        <Route path='/NewCourse' element={<NewCourse/>}/>
        <Route path='/CourseList' element={<CourseList/>}/>
        <Route path='/EditCourse/:id' element={<EditCourse/>}/>
        <Route path='/NewGrade' element={<NewGrade/>}/>  
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
