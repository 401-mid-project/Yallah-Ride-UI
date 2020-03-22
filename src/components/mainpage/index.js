import React from 'react';

import SignIn from './signin/signin.js';
import SignUp from './signup/signup.js';
import Intro from './intro/intro.js';




const mainPage = ()=>{

    return(

        <>

        <SignIn />
        <SignUp />
        <Intro />
        
        </>
    )
} 


export default mainPage ;