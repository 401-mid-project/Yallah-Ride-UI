import React from 'react'


const signUp= () => {

  return(
    <> 
    <form>

       <label>
        First Name: <input name='name' />
      </label>
      <label>
        Last Name: <input name='name' />
      </label>
      <label>
        Password: <input type='password' name='password' />
      </label>
      <label>
        Confirm Password: <input type='password' name='password' />
      </label>
      <input type="checkbox"/>
        <label>I accept the Terms of Use & Privacy Policy</label>
      <button type='submit' > SignUp </button>
      
    </form>


    </>
  );
};

export default signUp ;