import React,{useContext} from 'react';
// import { HashLink as Link } from 'react-router-hash-link';

import {userInfoContext} from '../../../contexts/userInfo.js'


function LeftSide() {

    const useCurrent = useContext(userInfoContext)


    return (
        <>
            <aside>

                <img alt={'Error'} />
                <ul>
                    <li>
                        <button onClick={()=> useCurrent.setCurrent('messages')}>
                            Messages
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> useCurrent.setCurrent('tasks')} >
                            My Tasks
                    </button>

                    </li>
                    <li>
                        <button onClick={()=> useCurrent.setCurrent('settings')}>
                            Settings
                    </button>


                    </li>
                </ul>

            </aside>
        </>
    )
}

export default LeftSide;