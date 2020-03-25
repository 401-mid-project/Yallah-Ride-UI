import React from 'react';


//components 
import Header from '../header/inHeader.js';
import Poster from './poster/poster.js';
import Render from './render/render.js';

function Search(){

    return(
        <>
            <Header />
            <Poster />
            <Render />
        </>
    )
    
}


export default Search ;