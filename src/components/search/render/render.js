import React, { useState, useEffect, useContext } from 'react';
import cookie from 'react-cookies';

//context
import { postContext } from '../../../contexts/poster.js';
import { userInfoContext } from '../../../contexts/userInfo.js';
import { HandleAsk, HandleOffer } from './render-functions.js'

const API = 'https://yalla-server401.herokuapp.com';



function Render() {

    const [rides, setRides] = useState([]);
    const [drives, setDrives] = useState([]);
    const [useButton, setUseButton] = useState(false);


    const usePost = useContext(postContext);
    const useInfo = useContext(userInfoContext);
    console.log(useInfo, '*********************')

    let getData = async () => {

        let token = await cookie.load('auth');
        let output = await fetch(`${API}/render`, {
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
            }),
        });

        let response = await output.json();

        setRides(response.rides);
        setDrives(response.drives);
    };


    useEffect(() => {
        getData();

    }, [usePost.offer, usePost.ask, useButton]);






    return (
        <>
            <section class="row">
                {rides.map((val, idx) => {
                    // console.log( 'each ASK:',val)
                    // console.log('@@@@@@' , val.booked)
                    if (val.booked !== 'true') {
                        // console.log('wtf1111' , useInfo.userData._id)
                        // console.log('wtf2222' , val.userId)
                        return (
                            <form class="columnR" key={idx} onSubmit={e => { return (HandleAsk(e), setUseButton(!useButton)) }} >

                            <div class="box S">
                                    <div class="date">
                                        <h4>{val.userName}</h4>
                                        <h4>{val.time}</h4><h4>TO {val.destination} </h4>
                                    </div>
                                    <h1>Asks</h1>
                                        <div class="date">
                                        <h4> Cost: {val.cost} JD </h4>
                                        <h4> Location: {val.location}</h4>
                                        <h4> Car: {val.catType} </h4>
                                        <h4> seats: {val.seats} </h4>
                                    </div>
                                </div>
                                <input type='hidden' name='userId' value={val.userId} />
                                <input type='hidden' name='askId' value={val.askId} />
                                <input type='hidden' name='userName' value={val.userName} />
                                <input type='hidden' name='destination' value={val.destination} />
                                <input type='hidden' name='location' value={val.location} />
                                <input type='hidden' name='time' value={val.time} />
                                <input type='hidden' name='cost' value={val.cost} />
                                <input type='hidden' name='booked' value={val.booked} />

                                {
                                    useInfo.userData.pendingMessages.filter(message => message.askId === val.askId).length === 0
                                    && useInfo.userData._id !== val.userId &&
                                    <button type='submit' > Request </button>
                                }
                            </form>

                        )
                    }
                })}
            </section>
            
            <section class="row">
                {drives.map((val, idx) => {
                    if (val.booked !== 'true') {

                        console.log('each offer', val.catType)
                        return (
                            <form class="columnR" key={idx} onSubmit={e => { return (HandleOffer(e), setUseButton(!useButton)) }} >


                                    <div class="box R">
                                    <div class="date">
                                        <h4>{val.userName}</h4>
                                        <h4>{val.time}</h4><h4>TO {val.destination}</h4>
                                    </div>
                                    <h1>Offer</h1>
                                        <div class="date">
                                        <h4> Cost: {val.cost} JD </h4>
                                        <h4> Location: {val.location}</h4>
                                        <h4> Car: {val.catType} </h4>
                                        <h4> seats: {val.seats} </h4>
                                    </div>
                                </div>

                                <input type='hidden' name='userId' value={val.userId} />
                                <input type='hidden' name='offerId' value={val.offerId} />
                                <input type='hidden' name='userName' value={val.userName} />
                                <input type='hidden' name='destination' value={val.destination} />
                                <input type='hidden' name='location' value={val.location} />
                                <input type='hidden' name='time' value={val.time} />
                                <input type='hidden' name='cost' value={val.cost} />
                                <input type='hidden' name='booked' value={val.booked} />
                                <input type='hidden' name='catType' value={val.catType} />
                                <input type='hidden' name='seats' value={val.seats} />

                                {
                                    useInfo.userData.pendingMessages.filter(message => message.askId === val.askId).length === 0
                                    && useInfo.userData._id !== val.userId &&
                                    <button type='submit' > Request </button>
                                }  
                            </form>
                            // <div key={idx}> {JSON.stringify(val)} </div>
                        )
                    }
                })}
            </section>

        </>
    )

}


export default Render;