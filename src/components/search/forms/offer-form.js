import React,{useContext} from 'react';
import cookie from 'react-cookies';

//contexts
import {userInfoContext} from '../../../contexts/userInfo.js';
import {postContext} from '../../../contexts/poster.js';

const API = 'http://localhost:3333';


function OfferForm(){
  const usePost = useContext(postContext);
  const useInfo = useContext(userInfoContext);


    const handleSubmit = (e)=>{
        e.preventDefault();
        let {location ,destination , time ,cost,carType,seats,userName,userId,offerId} = e.target ;

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
            <button onClick={()=> usePost.setOffer(false)}>X</button>
            
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

            <label>
                carType: <input required name='carType' />
            </label>
            <label>
                seats: <input required name='seats' type='number'/>
            </label>

            <input name='userName' type='hidden' value = {useInfo.userData.info.name} />
            <input name='userId' type='hidden' value = {useInfo.userData._id} />
            <input name='offerId' type='hidden' value = {`${useInfo.userData._id} ${useInfo.userData.drives.length + 1}` } />

            <button>Submit</button>

        </form>

        </>
    )
}

export default OfferForm;