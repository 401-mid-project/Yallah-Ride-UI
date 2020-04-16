import cookie from 'react-cookies';
const API = 'https://yalla-server401.herokuapp.com';



export const HandleAsk = (e) =>{
  e.preventDefault();
  
  let {userId , askId , userName , destination, location, time ,cost , booked} = e.target ;
  let message = {
    'userName': userName.value,
    'userId': userId.value ,
    'askId': askId.value ,
    'messageState':'pending',
    'destination': destination.value ,
    'location': location.value ,
    'time': time.value ,
    'cost': cost.value,
    'booked': booked.value,
  };

  sendAsk(message);
};


const sendAsk = async(message) => {
  console.log('areeeeeeeos', message);
  let token = await cookie.load('auth');
  await fetch(`${API}/search/requestAsk` , {
    method:'PUT',
    body: JSON.stringify(message) ,
    headers: new Headers({
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  });
      
  //   let response = await output.json();
          
  // console.log('sent !!!!!!');
};

////////////// offer side ///////////

export const HandleOffer = (e) =>{
  e.preventDefault();
  
  let {userId , offerId , userName , destination, location, time ,cost , booked , seats , catType} = e.target ;
  let message = {
    'userName': userName.value,
    'userId': userId.value ,
    'offerId': offerId.value ,
    'messageState':'pending',
    'destination': destination.value ,
    'location': location.value ,
    'time': time.value ,
    'cost': cost.value,
    'booked': booked.value,
    'seats': seats.value ,
    'catType': catType.value,
  };

  // console.log('areeeeeeeos', message);
  sendOffer(message);
};

const sendOffer = async(message) => {
  // console.log('areeeeeeeos', message);
  let token = await cookie.load('auth');
  await fetch(`${API}/search/requestOffer` , {
    method:'PUT',
    body: JSON.stringify(message) ,
    headers: new Headers({
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  });          
  // console.log('sent !!!!!!');
};

