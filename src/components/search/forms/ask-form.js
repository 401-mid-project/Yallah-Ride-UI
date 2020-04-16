import React,{useContext} from 'react';
import cookie from 'react-cookies';

import {postContext} from '../../../contexts/poster.js';
import {userInfoContext} from '../../../contexts/userInfo.js';

const API = 'https://yalla-server401.herokuapp.com';


function AskForm(){

  const usePost = useContext(postContext);
  const useInfo = useContext(userInfoContext);
  console.log('lets see', useInfo.userData);


  const handleSubmit = (e) => {
    e.preventDefault();
        let {location ,destination , time ,cost,userName,userId,askId , booked} = e.target ;

        let data = {
            'location':location.value,
            'destination':destination.value,
            'time':time.value,
            'cost':cost.value,
            'userName':userName.value,
            'userId':userId.value,
            'askId':askId.value,
            'booked': booked.value,
        };

        // console.log('data of ask', data);
        
        addAsk(data)
  }


  const addAsk = async(data) => {
    let token = await cookie.load('auth');
    let output = await fetch(`${API}/search/ask` , {
        method:'PUT',
        body: JSON.stringify(data) ,
        headers: new Headers({
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
        }),
      })
  
      let response = await output.json();
      
    //   console.log('ask-offer response' , response );
      usePost.setAsk(false)
  }


  return(
    <>

    
    <form onSubmit={(e)=> handleSubmit(e)} >
        <button className="ghost"  onClick={()=> usePost.setAsk(false)}>X</button>
        
          <div className="input-group">
          <input name='location' placeholder="Location" required /></div>

          <div className="input-group">
          <input name='destination' placeholder="Destination" required /></div>

          <div  className="input-group-date">
          <input name='time' placeholder="Time" type='datetime-local' required /></div>

          <div className="input-group">
          <input name='cost' placeholder="Cost" type='number' required /></div>

        <input name='userName' type='hidden' value = {useInfo.userData.info.name} />
        <input name='userId' type='hidden' value = {useInfo.userData._id} />
        <input name='askId' type='hidden' value = {`${useInfo.userData._id} ${useInfo.userData.rides.length + 1}` } />
        <input name='booked' value='false' type='hidden' />


        <button className="ghost">Submit</button>

    </form>

    </>
)
}

export default AskForm ;