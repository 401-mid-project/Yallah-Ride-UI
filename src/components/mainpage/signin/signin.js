import React,{useContext} from 'react'

import {loggerContext} from '../../../contexts/logger.js'
// import {userInfoContext} from '../../../contexts/userInfo.js';


const SignIn= () => {

    const useLogger = useContext(loggerContext);

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
    <form onSubmit={handleSubmit}>
       <label>
        UserName: <input name='name' />
      </label>
      <label>
        Password: <input type='password' name='password' />
      </label>
      <button type='submit' > LogIn </button>
    </form>


    </>
  );
};



export default SignIn ;
