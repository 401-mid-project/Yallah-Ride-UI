import React, { useContext } from 'react';
import cookie from 'react-cookies';

import { userInfoContext } from '../../../contexts/userInfo.js';
import { postContext } from '../../../contexts/poster.js';

const API = 'http://localhost:3333';

function OfferForm() {
    const usePost = useContext(postContext);
    const useInfo = useContext(userInfoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let { booked, location, destination, time, cost, carType, seats, userName, userId, offerId } = e.target;

        let data = {
            'location': location.value,
            'destination': destination.value,
            'time': time.value,
            'cost': cost.value,
            'catType': carType.value,
            'seats': seats.value,
            'userName': userName.value,
            'userId': userId.value,
            'offerId': offerId.value,
            'booked': booked.value,
        };

        console.log('data of Offer', data);

        addOffer(data)
    }


    const addOffer = async (data) => {

        let token = await cookie.load('auth');
        let output = await fetch(`${API}/search/offer`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
        })

        let response = await output.json();

        console.log('add-offer response', response);
        usePost.setOffer(false)

    }

    return (
        <>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>

                <div className="input-group1">
                    <input name='location' placeholder="Location" required /></div>

                <div className="input-group1">
                    <input name='destination' placeholder="Destination" required /></div>

                <div className="input-group-date">
                    <input name='time' placeholder="Time" type='datetime-local' required /></div>

                <div className="input-group1">
                    <input name='cost' placeholder="Cost" type='number' required /></div>

                <div className="input-group1">
                    <input name='carType' placeholder="Car Type" required /></div>

                <div className="input-group1">
                    <input name='seats' placeholder="Seats" required /></div>

                <input name='userName' type='hidden' value={useInfo.userData.info.name} />
                <input name='userId' type='hidden' value={useInfo.userData._id} />
                <input name='offerId' type='hidden' value={`${useInfo.userData._id} ${useInfo.userData.drives.length + 1}`} />
                <input name='booked' value='false' type='hidden' />

                <button className="ghost1">Submit</button><button className="ghost1" onClick={() => usePost.setOffer(false)}>Close</button>

            </form>

        </>
    )
}

export default OfferForm;