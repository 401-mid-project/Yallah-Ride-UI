import cookie from 'react-cookies';


const API = 'http://localhost:3333';

export const handleAskResponse = (e) =>{
  e.preventDefault();

  let {userId , askId , action} = e.target ;
  let data = {
    'userId': userId.value ,
    'askId': askId.value ,
    'action': action.value ,
  };
  // console.log('handler @@@@@' , data);
  askResponse(data);
};

const askResponse = async(data) =>{

  let token = await cookie.load('auth');
  await fetch(`${API}/askResponse` , {
    method:'PUT',
    body: JSON.stringify(data) ,
    headers: new Headers({
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  });

  console.log('response Done !!');
};


/////////////////////// offers ////////////

export const handleOfferResponse = (e) =>{
  e.preventDefault();

  let {userId , offerId , action} = e.target ;
  let data = {
    'userId': userId.value ,
    'offerId': offerId.value ,
    'action': action.value ,
  };
  console.log('dadadada' , data);
  offerResponse(data);
};

const offerResponse = async(data) =>{

  let token = await cookie.load('auth');
  await fetch(`${API}/offerResponse` , {
    method:'PUT',
    body: JSON.stringify(data) ,
    headers: new Headers({
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  });

  console.log('response Done !!');
};

