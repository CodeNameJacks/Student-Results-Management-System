import React from "react";
import {useEffect, useState} from "react";
//import {} from 'react-redux';
//import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  const [ data, setData] = useState("");
  
  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  },[]);

  
  
  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
