import React, { useState, useEffect, useContext } from 'react';
import cookie from 'react-cookies';

//context
import { postContext } from '../../../contexts/poster.js';
import { userInfoContext } from '../../../contexts/userInfo.js';
import { HandleAsk, HandleOffer } from './render-functions.js'

const API = 'http://localhost:3333';



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
            <section>
                <h2>Asks</h2>
                {rides.map((val, idx) => {
                    // console.log( 'each ASK:',val)
                    // console.log('@@@@@@' , val.booked)
                    if (val.booked !== 'true') {
                        // console.log('wtf1111' , useInfo.userData._id)
                        // console.log('wtf2222' , val.userId)
                        return (

                            <form key={idx} onSubmit={e => { return (HandleAsk(e), setUseButton(!useButton)) }} >

                                <fieldset>
                                    <legend>Ask</legend>
                                    <a href='#'>
                                        <img src='https://icons.iconarchive.com/icons/iconsmind/outline/256/Lock-User-icon.png'></img>
                                        <p> {val.userName} </p>
                                    </a>
                                    <li> Destination: {val.destination} </li>
                                    <li> Location: {val.location} </li>
                                    <li> Time: {val.time} </li>
                                    <li> Cost: {val.cost} JD </li>
                                </fieldset>
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

            <section>
                <h2>Offer</h2>
                {drives.map((val, idx) => {
                    if (val.booked !== 'true') {

                        console.log('each offer', val.catType)
                        return (
                            <form key={idx} onSubmit={e => { return (HandleOffer(e), setUseButton(!useButton)) }} >

                                <fieldset>
                                    <legend>Offer</legend>
                                    <a href='#'>
                                        <img src='https://icons.iconarchive.com/icons/iconsmind/outline/256/Lock-User-icon.png'></img>
                                        <p> {val.userName} </p>
                                    </a>
                                    <li> Destination: {val.destination} </li>
                                    <li> Location: {val.location} </li>
                                    <li> Time: {val.time} </li>
                                    <li> Cost: {val.cost} JD </li>
                                    <li> Car: {val.catType} </li>
                                    <li> seats: {val.seats} </li>
                                </fieldset>
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