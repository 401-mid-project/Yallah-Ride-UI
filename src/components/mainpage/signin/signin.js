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
  return (
    <>
      <div className="form-container sign-in-container">
        <form className="form1" action="#" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">

            <a className="btns" href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btns" href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btns" href="#">
              <i className="fab fa-instagram"></i>
            </a>

          </div>
          <div className="input-group">
            <input type="text" name='name' id="loginUser" placeholder="UserName" required />
          </div>

          <div className="input-group">
            <input type="password" name='password' id="loginPassword" placeholder="Password" required />
          </div>

          <a className="a" data-aos="zoom-in" href="#">Forgot your password?</a>
          <button className="ghost" data-aos="fade-up-right" id="Sign">Sign In</button>
        </form>
      </div>
    </>
  );
};



export default SignIn;
