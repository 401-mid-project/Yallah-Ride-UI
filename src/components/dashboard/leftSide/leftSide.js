import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../../style/dashboard.scss';
import profile_img from '../../../img/profiler.png'
import { userInfoContext } from '../../../contexts/userInfo.js'


function LeftSide() {

    const useCurrent = useContext(userInfoContext)


    return (
        <>
            <div className="sidebar">
                <div className="bg_shadow"></div>
                <div className="sidebar__inner">
                    <div className="profile_info">
                        <div className="profile_img">
                            <img src={profile_img} alt="profile_img" />
                        </div>
                        <div className="profile_data">
                            <p className="name">Rashid .S</p>
                            <p className="role">UI Developer</p>
                        </div>
                    </div>
                    <ul className="siderbar_menu">
                        <li><a href="#" onClick={() => useCurrent.setCurrent('messages')}>
                            <div className="icon"><i className="fa fa-envelope"></i></div>
                            <div className="title">Messages</div>
                        </a></li>
                        <li><a href="#" onClick={() => useCurrent.setCurrent('tasks')}>
                            <div className="icon"><i className="fas fa-file-alt"></i></div>
                            <div className="title">My Tasks</div>
                        </a></li>
                        <li><a href="#" onClick={() => useCurrent.setCurrent('settings')}>
                            <div className="icon"><i className="fas fa-cog"></i></div>
                            <div className="title">Update Profile</div>
                        </a></li>
                        <Link to='/needHelp'><li><a href="#">
                            <div className="icon"><i className="fas fa-question-circle"></i></div>
                            <div className="title">Help</div>
                        </a></li>  </Link>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default LeftSide;