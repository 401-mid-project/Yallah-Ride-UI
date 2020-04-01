import React, { useState, useEffect , useContext} from 'react';
import {loggerContext} from '../../../contexts/logger.js';

const API = 'http://localhost:3333';



const SignUp = () => {
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passState, setPassState] = useState(true);
  const [message , setMessage] = useState(false)
  
  const useLogger = useContext(loggerContext);

  useEffect(() => {

    if (password === confirmPassword) {
      setPassState(false);
    } else {
      setPassState(true);;
    }
  },[password , confirmPassword])

   let handleSubmit =(e) => {
     e.preventDefault();


     let { userName , firstName , lastName ,password ,smoker , gender } = e.target ;
     let data = {info: {
       name: userName.value,
       firstName: firstName.value ,
       lastName: lastName.value ,
       password: password.value,
       smoker: smoker.value , 
       gender: gender.value ,
     }}

     handleSignUp(data);
     
     console.log(data);
   }



   let handleSignUp = async(data) => {

    let output = await fetch(`${API}/signup` , {
      headers: {
        'Content-Type': 'application/json'
      },
      method:'POST',
      mode: 'cors',
      cache : 'no-cache',
      body: JSON.stringify(data)
    })

    let response = await output.json();


    // check if the username already exist or not 
    // if exist server returns empty object
    // if not returns {token , id} 

    if(Object.keys(response).length === 2){
      useLogger.validator(response.token , response.id);
    }else{
      // setMessage we use it to show the Message to the user, if we already have an account with the same information 
      setMessage(true)      
    }

    console.log('Works' , response);

   }



  return (
    <>
    <div class="form-container sign-up-container">
        {/*  we can't write if statement inside return so we do it this way*/}
        {message &&
          <div>
            <button onClick={() => setMessage(false)}> X </button>
            <p>UserName already Exist!!</p>
          </div>
        }

        <form action="#" onSubmit={e => handleSubmit(e)}>
          <h1 data-aos="zoom-in-up">Create Account</h1>
          <div className="social-container">

            <a data-aos="fade-right" className="btns" href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a data-aos="fade-up-right" className="btns" href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a data-aos="fade-up" className="btns" href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a data-aos="fade-up-left" clclassNameass="btns" href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a data-aos="fade-left" className="btns" href="#">
              <i className="fab fa-google"></i>
            </a>

          </div>
          <div data-aos="zoom-in-left" className="input-group">
          <input name='userName' placeholder="User Name" required /></div>
          <div data-aos="zoom-in-left" className="input-group">
          <input name='firstName' placeholder="First Name" required /></div>
          <div data-aos="zoom-in-left" className="input-group">
          <input name='lastName' placeholder="Last Name" required /></div>
          <div data-aos="zoom-in-left" className="input-group">
          <input required type='password' name='password' id='password' placeholder="Password" onChange={e => setPassword(e.target.value)} /></div>
          <div data-aos="zoom-in-left" className="input-group">
          <input required type='password' name='confirmPassword' id='confirmPassword' placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} /></div>

          <div className='divs'>
          <label  data-aos="fade-left" className='input_font_color' for="s1">Smoker </label>
          <input  data-aos="fade-left" id="s1" type='checkbox' className="switch" name='smoker' value='yes' />
          </div>

          <div className='input_font_color' className='divs'><a data-aos="fade-left">
         Male <input data-aos="fade-left" id="r1" type='radio' name='gender' value='male' /></a><a data-aos="fade-left"> &nbsp;
         Female  <input data-aos="fade-left" id="r2" type='radio' name='gender' value='female' /></a>
          </div>

          
          <div  className='divs'>
          <label data-aos="fade-left" className='input_font_color'>I accept the Terms of Use & Privacy Policy </label>
          <input data-aos="fade-left" type="checkbox" required />
          </div>
          <button className="ghost" type='submit' name='signUp' id='signUp' disabled={passState} > SignUp </button>
        </form>
      </div>


    </>
  );
};

export default SignUp;