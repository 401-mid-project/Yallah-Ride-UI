import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import {loggerContext} from '../../contexts/logger.js';

function InHeader() {

    const useLogger = useContext(loggerContext);

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
                        <button onClick={useLogger.logOut} > LogOut </button>
                    </li>

                </ul>
            </nav>

        </>
    )
}

export default InHeader ;