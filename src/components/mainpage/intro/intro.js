import React from 'react'
import img1 from '../../../img/img1.png'

const intro = () => {

    return (
        <><div className='yallahRidet'>

            <div className="header">
                <div className="inner_header">
                    <div data-aos="fade-down-right" className="logo_container">
                        <h1 id="h1"> Yallah<span id="offset">Ride</span></h1>
                    </div> <ul className="navigation">
                        <a><li data-aos="fade-down" className="li">Our-Team</li></a>
                        <a><li data-aos="fade-down-left" className="li"> Support</li></a>
                        <a><li data-aos="fade-down-left" className="li"> AboutUs </li></a>
                    </ul>
                </div>
            </div>

            <div class="img1">
                <img src={img1} alt="img1" />
            </div>
            <section className="intro_info">
                <h1 data-aos="fade-down-right" className="title"> LOREM IPSUM </h1>
                <h1 data-aos="fade-right">Consectetur Adipiscing Elit. </h1>

                <hr className="line" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" color="red"/>

                <h1 data-aos="fade-up-right">Sollicitudin Tincidunt </h1>
                <p data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan lectus eu sollicitudin tincidunt. Suspendisse facilisis metus eu orci rutrum.</p>
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