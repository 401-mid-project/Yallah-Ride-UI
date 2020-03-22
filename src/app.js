import React from 'react';

import MainPage from './components/mainpage';
import Logger from './contexts/logger.js'


const App = ()=> {

    return(
        <>
        <Logger>

        <MainPage />

        </Logger>
        </>
    )

}


export default App ;