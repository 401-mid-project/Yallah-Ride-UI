import React from 'react';
import '../../main.js';
import SignIn from './signin/signin.js';
import SignUp from './signup/signup.js';
import Intro from './intro/intro.js';
import '../../style/main.scss';


const mainPage = () => {

    return (

        <>
            <Intro />
            <div className="container" id="container">
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 data-aos="zoom-in-up">Stranger!!</h1>
                            <p className="p" data-aos="fade-right">If you have finished the registration process or already have an account, please SignIn here</p>
                            <button class="ghost" data-aos="fade-up-right" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 data-aos="zoom-in-up">Welcome Stranger!</h1>
                            <p className="p" data-aos="fade-left">Enter your personal details and start journey with Yallah Ride</p>
                            <button className="ghost" data-aos="fade-up-left" className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
                <SignIn />
                <SignUp />
            </div>
            <footer>
                <a>Yallah Ride 2020	&copy; </a>
                <a>WWW.YallahRide.com</a>
            </footer>

        </>
    )
}


export default mainPage;