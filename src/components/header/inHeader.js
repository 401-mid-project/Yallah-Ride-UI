import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../../style/header.scss';
import {loggerContext} from '../../contexts/logger.js';
import {userInfoContext} from '../../contexts/userInfo.js';

function InHeader() {

    const useLogger = useContext(loggerContext);
    const useInfo = useContext(userInfoContext);

    let handleLogout = ()=>{
        useLogger.logOut();
        useInfo.setDataState(false);
        useInfo.setCurrent('messages')

    }

    return (

        <>
    <div className="main_container">
      <div className="top_navbar">
         <ul className="menu">
            <li><a href="#"><Link to='/dashboard'> Dashboard </Link></a></li>
            <li><a href="#"><Link to='/Our_Team'> Our-Team </Link></a></li>
            <li><a href="#"><Link to='/aboutUs'> AboutUs </Link></a></li>
         </ul>
         <ul className="right_bar">
         <li><Link to='/search'><i className="fas fa-search"></i></Link></li>
         <li><i className="fas fa-sign-out-alt" onClick={handleLogout}></i></li> 
         </ul>
      </div>
    </div>
        </>
    )
}

export default InHeader ;