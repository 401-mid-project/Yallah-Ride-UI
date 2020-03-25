import React,{useContext} from 'react';

import {postContext} from '../../../contexts/poster.js';
import {userInfoContext} from '../../../contexts/userInfo.js';



function AskForm(){

  const usePost = useContext(postContext);
  const useInfo = useContext(userInfoContext);
  console.log('lets see', useInfo.userData);


  return(
    <>
    
    <form>
        <button onClick={()=> usePost.setAsk(false)}>X</button>
        
        <label>
            location: <input required name='location' />
        </label>
        <label>
            Destination: <input required name='destination'/>
        </label>
        <label>
            time: <input required name='time' type='datetime-local'/>
        </label>
        <label>
            cost: <input required name='cost' type='number'/> JD
        </label>

        <input name='userName' type='hidden' value = {useInfo.userData.name} />
        <input name='userId' type='hidden' value = {useInfo.userData._id} />
        <input name='askId' type='hidden' value = {useInfo.userData.rides.length + 1 } />


        <button>Submit</button>

    </form>

    </>
)
}

export default AskForm ;