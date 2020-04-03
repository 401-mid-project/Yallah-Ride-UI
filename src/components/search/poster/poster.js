import React, { useContext } from 'react';

//context
import { postContext } from '../../../contexts/poster.js'

//components
import Offer from '../forms/offer-form.js';
import Ask from '../forms/ask-form.js';

function Poster() {

    const usePost = useContext(postContext);
    console.log('poster', usePost);

    let Form;
    if (usePost.offer && !usePost.ask) {
        Form = <Offer />;
    } else if (usePost.ask && !usePost.offer) {
        Form = <Ask />;

    } else {
        Form = <></>;
    }

    return (
        <><ul className="siderbar_menu">
            <li><a href="#" onClick={() => usePost.setOffer(true)}>
                <div className="icon"><i className="fa fa-car"></i></div>
                <div className="title">Add Offer</div>
            </a></li>

            <li><a href="#" onClick={() => usePost.setAsk(true)}>
                <div className="icon"><i className="fa fa-male"></i></div>
                <div className="title">Add Ask</div>
            </a></li>
        </ul>
            {Form}

        </>
    )
}

export default Poster;