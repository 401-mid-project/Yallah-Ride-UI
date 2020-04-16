import React,{useState , useEffect} from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken' ;


const API = 'https://yalla-server401.herokuapp.com';

const SECRET = 'Shushhhhh' ;

export const loggerContext = React.createContext();



function LoggerProvider(props){

    const [logState , setLogState] = useState(false);
    const  [userId , setUserId] = useState('');




    const validator = (token , id) =>{
        try{
            let userValidator = jwt.verify(token,SECRET);
            cookie.save('auth' , token);
            cookie.save('_id', id)
            setLogState(userValidator);
            setUserId(id);
        }catch(e){
            setLogState(false);
            setUserId('');
            console.error('Validator Functions',e)
        }
    }

    let logIn = async(username,password)=>{

        try{
            
            let output  = await fetch(`${API}/signin`,{
                method:'POST',
                mode: 'no-cors',
                cache : 'no-cache',
                headers: new Headers({
                    'Authorization':`Basic ${btoa(`${username}:${password}`)}`
                })
            });
            let response = await output.json();
            // console.log(response , typeof response)
            await validator(response.token , response.id)
        }catch(e){
            console.error(e)
        }        
    };

    let logOut = ()=>{
        cookie.save('auth' , null);
        cookie.save('_id' , '');
        setLogState(false);
        setUserId('');
    }

    


    // to stay logged in after refresh  
    useEffect(()=>{

        let loadToken = cookie.load('auth');
        let loadId = cookie.load('_id');
        const qs = new URLSearchParams(window.location.search);

        let token = loadToken ||qs.get('auth') || null ;
        let id = loadId || qs.get('_id') || '' ;
            validator(token , id);
    },[])





    let keys = {logIn , logOut , logState ,userId ,validator};
    
    return(
            
            <loggerContext.Provider value={keys}>
                {props.children}
            </loggerContext.Provider>
    )
}

export default LoggerProvider ;

