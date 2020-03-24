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

    }

    return (

        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/dashboard'> Dashboard </Link>
                    </li>
                    <li>
                        <Link to='/search'> Search </Link>
                    </li>
                    <li>
                        <Link to='/needHelp'> Need Help? </Link>
                    </li>
                    <li>
                        <Link to='/aboutUs'> AboutUs </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} > LogOut </button>
                    </li>

                </ul>
            </nav>

        </>
    )
}

export default InHeader ;