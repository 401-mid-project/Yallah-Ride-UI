import React , {useContext} from 'react';
import '../../style/dashboard.scss';
import profile_img from '../../img/do.png'
//components 
import Header from '../header/inHeader.js';
import Poster from './poster/poster.js';
import Render from './render/render.js';

//test 
//context
import { postContext } from '../../contexts/poster.js'

//components
import Offer from './forms/offer-form.js';
import Ask from './forms/ask-form.js';


function Search() {
    const usePost = useContext(postContext);

    let Form;
    if (usePost.offer) {
        usePost.setAsk(false);
        Form = <Offer />;

    } else if (usePost.ask) {
        usePost.setOffer(false);
        Form = <Ask />;

    } else {
    
        Form = <></>;
    }


    return (
        <>
            {Form}
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