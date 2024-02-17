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
import Home from './element/Home'
import NewStudent from './element/NewStudent' //do this for the other components


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
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
