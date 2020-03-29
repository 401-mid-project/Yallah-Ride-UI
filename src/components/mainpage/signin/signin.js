import React,{useContext, useEffect} from 'react'

import {loggerContext} from '../../../contexts/logger.js'
import {userInfoContext} from '../../../contexts/userInfo.js';


const SignIn= () => {

    const useLogger = useContext(loggerContext);
    const useInfo = useContext(userInfoContext);

    // console.log('component', useLogger)

    let handleSubmit = (e) => {
        e.preventDefault();
        let userName = e.target.name.value ;
        let password = e.target.password.value ;
        console.log('handleSubmit' , userName)
        useLogger.logIn(userName , password) ;
    }


    // useEffect(()=>{
    //   useInfo.setDataState(false);
    // } ,[])



  return(
    <> 
  <div className="wrapper">

    <section className="top-container">

    <div className="top-box-signin">
    


    <div className="container">

    <form className="signin" onSubmit={handleSubmit}>
      <h1>Sign in</h1>
       <label>
        UserName: <input name='name' />
      </label>
      <label>
        Password: <input type='password' name='password' />
      </label>
      <button type='submit' > LogIn </button>
    </form>

    </div>



    </div> 
    </section>

  </div>
    </>
  );
};



export default SignIn ;
