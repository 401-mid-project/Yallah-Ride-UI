import React,{useContext} from 'react';
import cookie from 'react-cookies';

//contexts
import {userInfoContext} from '../../../contexts/userInfo.js';
import {postContext} from '../../../contexts/poster.js';

const API = 'https://yalla-server401.herokuapp.com';


function OfferForm(){
  const usePost = useContext(postContext);
  const useInfo = useContext(userInfoContext);


    const handleSubmit = (e)=>{
        e.preventDefault();
        let {booked , location ,destination , time ,cost,carType,seats,userName,userId,offerId} = e.target ;

        let data = {
            'location':location.value,
            'destination':destination.value,
            'time':time.value,
            'cost':cost.value,
            'catType':carType.value,
            'seats':seats.value,
            'userName':userName.value,
            'userId':userId.value,
            'offerId':offerId.value,
            'booked': booked.value,
        };

        console.log('data of Offer', data);
        
        addOffer(data)
    }


    const addOffer = async(data) => {

        let token = await cookie.load('auth');
        let output = await fetch(`${API}/search/offer` , {
            method:'PUT',
            body: JSON.stringify(data) ,
            headers: new Headers({
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
          })
      
          let response = await output.json();
          
          console.log('add-offer response' , response );
          usePost.setOffer(false)

    }




    return(
        <>

          

          

          

          
        
        <form onSubmit={(e)=> handleSubmit(e)}>
            <button className="ghost"  onClick={()=> usePost.setOffer(false)}>X</button>
            
            <div className="input-group">
          <input name='location' placeholder="Location" required /></div>

          <div className="input-group">
          <input name='destination' placeholder="Destination" required /></div>

          <div className="input-group-date">
          <input name='time' placeholder="Time" type='datetime-local' required /></div>

          <div className="input-group">
          <input name='cost' placeholder="Cost" type='number' required /></div>

          <div className="input-group">
          <input name='carType' placeholder="Car Type" required /></div>

          <div className="input-group">
          <input name='seats' placeholder="Seats" required /></div>

            <input name='userName' type='hidden' value = {useInfo.userData.info.name} />
            <input name='userId' type='hidden' value = {useInfo.userData._id} />
            <input name='offerId' type='hidden' value = {`${useInfo.userData._id} ${useInfo.userData.drives.length + 1}` } />
            <input name='booked' value='false' type='hidden' />

            <button className="ghost">Submit</button>

        </form>

        </>
    )
}

export default OfferForm;