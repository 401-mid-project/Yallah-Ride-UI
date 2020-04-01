import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

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
            <nav>
<ul>                        
                      
                        <a><li data-aos="fade-down" className="li">
                        <Link to='/dashboard'> Dashboard </Link>
                    </li></a>

                    <a><li data-aos="fade-down-left" className="li">
                        <Link to='/search'> Search </Link>
                    </li></a>


                    <a><li data-aos="fade-down-left" className="li">
                        <Link to='/needHelp'> Need Help? </Link>
                    </li></a>

                    <a><li data-aos="fade-down-left" className="li">
                        <Link to='/aboutUs'> AboutUs </Link>
                    </li></a>


                    <a><li data-aos="fade-down-left" className="li">
                        <button onClick={handleLogout} > LogOut </button>
                    </li></a>

                </ul>
            </nav>

        </>
    )
}

export default InHeader ;