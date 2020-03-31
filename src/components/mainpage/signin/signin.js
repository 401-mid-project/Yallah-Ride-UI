import React, { useContext } from 'react'

import { loggerContext } from '../../../contexts/logger.js'
// import {userInfoContext} from '../../../contexts/userInfo.js';


const SignIn = () => {

  const useLogger = useContext(loggerContext);

  // console.log('component', useLogger)

  let handleSubmit = (e) => {
    e.preventDefault();
    let userName = e.target.name.value;
    let password = e.target.password.value;
    console.log('handleSubmit', userName)
    useLogger.logIn(userName, password);
  }


  // useEffect(()=>{
  //   useInfo.setDataState(false);
  // } ,[])



  return (
    <>
      <div class="form-container sign-in-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1 data-aos="zoom-in-up">Sign in</h1>
          <div class="social-container">

            <a data-aos="fade-up-right" class="btn" href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a data-aos="fade-up" class="btn" href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a data-aos="fade-up-left" class="btn" href="#">
              <i class="fab fa-instagram"></i>
            </a>


          </div>
          <div data-aos="fade-right" class="input-group">
            <input type="text" name='name' id="loginUser" placeholder="UserName" required />
          </div>

          <div data-aos="fade-right" class="input-group">
            <input type="password" name='password' id="loginPassword" placeholder="Password" required />
          </div>

          <a data-aos="zoom-in" href="#">Forgot your password?</a>
          <button class="ghost" data-aos="fade-up-right" id="Sign">Sign In</button>
        </form>


      </div>


    </>
  );
};



export default SignIn;
