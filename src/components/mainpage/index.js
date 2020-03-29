import React from 'react';

import SignIn from './signin/signin.js';
import SignUp from './signup/signup.js';
import Intro from './intro/intro.js';




const mainPage = ()=>{

    return(

        <>
        
        <Intro />
        <SignIn />
        <SignUp />
        
        </>
    )
} 


export default mainPage ;