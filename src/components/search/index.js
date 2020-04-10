import React from 'react';
import '../../style/dashboard.scss';
import profile_img from '../../img/do.png'
//components 
import Header from '../header/inHeader.js';
import Poster from './poster/poster.js';
import Render from './render/render.js';

function Search() {

    return (
        <>
            <div className="wrapper">
                <div className="sidebar">
                    <div className="bg_shadow"></div>
                    <div className="sidebar__inner">
                        <div className="profile_info">
                            <div className="profile_img">
                                <img src={profile_img} alt="profile_img" />
                            </div>
                            <div className="profile_data">
                                <p className="name">Yalla-Ride</p>
                                <p className="role">Team</p>
                            </div>
                        </div>
                        <Poster />
                    </div>
                </div>
                <div className="main_container">
                    <Header />
                    <div className="containerx">
                    </div>
                </div>
            </div>


            <Render />
        </>
    )

}


export default Search;