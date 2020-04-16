import React,{useContext} from 'react';

//context
import {postContext} from '../../../contexts/poster.js'

//components
import Offer from '../forms/offer-form.js';
import Ask from '../forms/ask-form.js';

function Poster(){

    const usePost = useContext(postContext);
    console.log('poster', usePost);

    let Form ;
    if(usePost.offer && !usePost.ask){
        Form = <Offer /> ;
    }else if(usePost.ask && !usePost.offer){
        Form = <Ask /> ;

    }else{
        Form = <></> ;
    }


    return(
        <>
        <input type='search' />

        <button onClick={ ()=> usePost.setOffer(true)}> Offer </button>

        <button onClick={ ()=> usePost.setAsk(true)}> Ask </button>

        {Form}

        </>
    )
}

export default Poster ;