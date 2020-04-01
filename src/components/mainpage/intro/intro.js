import React from 'react'
import img1 from '../../../img/img2.png'
import InHeader from '../../header/inHeader.js'

const intro = () => {

    return (
        <>
        
        <div className='yallahRidet'>

            <div className="header">
                <div className="inner_header">

                    <div data-aos="fade-down-right" className="logo_container">

                        <h1 id="h1"> Yallah<span id="offset">Ride</span></h1>

                    </div> 

                    <ul className="navigation">
                        <InHeader></InHeader>
                    </ul>
                    
                </div>
            </div>

            <div class="img1">
                <img src={img1} alt="img1" />
            </div>

            <section className="intro_info">
                <h1 data-aos="fade-down-right" className="title"> Yallah Ride </h1>
                <h1 data-aos="fade-right">Your most trusted rides </h1>

                <hr className="line" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" color="#8ba81c"/>
                <p data-aos="fade-up-right">Here at Yallah Ride we are glad to connect both users who are looking for accompany and already having their own car, or the customers that are looking for a lift.</p>
                <a className="a_btn" href="#Sign">Join Us</a>
                
                <section id="Down" class="demo">
                    <a href="#Sign"><span></span></a>
                </section>
            </section>
        </div>
        </>
    );
};

export default intro;