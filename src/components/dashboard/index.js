import React from 'react';

//components 
import Header from '../header/inHeader.js';
import Left from './leftSide/leftSide.js';
import Main from '../dashboard/mainSide/mainSide.js'


function Dashboard(){


    return(
        <>

        <Header />
        <Left />
        <Main />
        <h1>
            DashBoard !!!
        </h1>
        </>
    )
}


export default Dashboard ;