import React , {useContext ,useEffect} from 'react';
import {Route , Redirect} from 'react-router-dom';

//components
import MainPage from './components/mainpage';
import Dashboard from './components/dashboard' 

//contexts 
import {loggerContext} from './contexts/logger.js';


const App = ()=> {
    const useLogger = useContext(loggerContext);
    console.log('app.js' , useLogger.logState);

    useEffect(()=>{
        let state = useLogger.logState ; 
    })


    return(
        <>
        {/* { console.log('inside' , useLogger.logState)} */}

        <Route exact path='/'>
        {useLogger.logState ? <Redirect to='/dashboard' /> : <MainPage />}
        </Route>

        <Route exact path= '/dashboard'>
        {useLogger.logState ? <Dashboard /> : <Redirect to='/' />}
         
        </Route>


        </>
    )

}


export default App ;