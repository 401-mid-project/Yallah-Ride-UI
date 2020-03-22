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
  })

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
    {/*  we can't write if statement inside jsx so we do it this way*/}
      {message && 
      <div>
        <button onClick={() => setMessage(false)}> X </button>
        <p>UserName already Exist!!</p>
      </div>
      }


      <form onSubmit = { e => handleSubmit(e)}>

        <label>
          User Name: <input name='userName' />
        </label>

        <label>
          First Name: <input name='firstName' />
        </label>
        <label>
          Last Name: <input name='lastName' />
        </label>
        <label>
          Password: <input required type='password' name='password' id='password' onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password: <input required type='password' name='confirmPassword' id='confirmPassword' onChange={e => setConfirmPassword(e.target.value)} />
        </label>


        <label>
          Smoker: <input type='checkbox' name='smoker' value='yes' />
        </label>

        <label>
          Gender: 
          <label>
          Male: <input type='radio' name='gender' value='male' />
          </label>

          <label>
          Female: <input type='radio' name='gender' value='female' />
          </label>
        </label>



        <input type="checkbox" required />
        <label>I accept the Terms of Use & Privacy Policy</label>

        <button type='submit' name='signUp' id='signUp' disabled={passState} > SignUp </button>

      </form>


    </>
  );
};

export default SignUp;