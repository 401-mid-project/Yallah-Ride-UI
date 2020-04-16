import React,{useState} from 'react';

export const postContext = React.createContext();

function Post(props){

    const [offer , setOffer] = useState(false);
    const [ask , setAsk] = useState(false);

    let keys = {offer , ask , setAsk , setOffer};

    return(

        <postContext.Provider value={keys} >
            {props.children}
        </postContext.Provider>
        
    )

}

export default Post 