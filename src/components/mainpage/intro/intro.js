import React from 'react'
import img1 from '../../../img/img2.png'

const intro = () => {

    return (
        <><div className='yallahRidet'>

            <div className="header">
                <div className="inner_header">
                    <div className="logo_container">
                        <h1 id="h1"> Yallah<span id="offset">Ride</span></h1>
                    </div> <ul className="navigation">
                        <a><li  className="li">Our-Team</li></a>
                        <a><li  className="li"> Support</li></a>
                        <a><li  className="li"> AboutUs </li></a>
                    </ul>
                </div>
            </div>

            <div className="img1">
                <img src={img1} alt="img1" />
            </div>
            <section className="intro_info">
                <h1  className="titlee"> YOU NEED A RIDE!!? </h1>
                <h1 >Yallah Ride </h1>

                <hr className="line" color="red"/>

                <h1 >Your most trusted rides </h1>
                <p className="p">Here at Yallah Ride we are glad to connect both users who are looking for accompany and already having their own car, or the customers that are looking for a lift.</p>
                <a className="a_btn" href="#Sign">Join</a>
                
                <section id="Down" class="demo">
                    <a href="#Sign"><span></span></a>
                </section>
            </section>
        </div>
        </>
    );
};

export default intro;