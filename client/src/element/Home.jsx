import React from 'react'
var logo = require('../assets/images/logo.png');
var list = require('../assets/fontAwesome/list.png');
require('../assets/css/home.css');


function Home() {
    return (
        <>
            <div>   
                <img src={logo}/>
                <p> Student Management Registration System</p>
            </div>
        </>
    )
}

export default Home