import React,{useState} from 'react';
import cookie from 'react-cookies';

export const userInfoContext =  React.createContext();

const API = 'http://localhost:3333';


function UserInfoProvider(props){

  // save user schema
  const [userData , setUserData] = useState({});
  const [dataState , setDataState] = useState(false)

  // for Dashboard menu 
  const [current , setCurrent] = useState('messages');


  const getInfo = async()=> {
  // we bring the id & token from the cookies to use the data later on
    let token = await cookie.load('auth');

    let output = await fetch(`${API}/dashboard` , {
        method: 'GET',
        cache: 'no-cache',
        mode:'cors',
        headers: new Headers({
            'Authorization':`Bearer ${token}`
        })
    });

    let response = await output.json()
    await setUserData(response);
    await setDataState(true);

    // console.log(response);
  }


//   useEffect(()=>{
//       getInfo();
//   },[]);


  let keys = {current , setCurrent , getInfo , userData , dataState ,setDataState};

  return(

    <userInfoContext.Provider value={keys} >
        {props.children}
    </userInfoContext.Provider>
  )
}

export default UserInfoProvider ;