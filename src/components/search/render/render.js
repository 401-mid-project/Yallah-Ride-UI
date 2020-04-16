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
                    if (val.booked !== 'true') {
                        return (
                            <form className="form1" class="columnR" key={idx} onSubmit={e => { return (HandleAsk(e), setUseButton(!useButton)) }} >
                                

                                    <div class="cardS">
                                        <div class="additional">
                                            <div class="user-card">
                                                <div class="points center">
                                                {
                                    useInfo.userData.pendingMessages.filter(message => message.askId === val.askId).length === 0
                                        && useInfo.userData._id !== val.userId &&

                                        <button type='submit' > Request </button>
                                    }
                                                  </div>

                                            </div>

                                            
                                            <div class="more-info">
                                                <h1>Ask</h1>
                                                <div class="coords">
                                                    <span>{val.userName} </span>
                                                    <span>{val.time}</span>
                                                </div>
                                                <div class="coords">
                                                    <span>From {val.location}</span>
                                                    <span>TO {val.destination}</span>
                                                </div>  


                                                <div class="stats">
                                                    <div>
                                                        <div class="title">Pay</div>
                                                        <i class="fas fa-hand-holding-usd"></i>
                                                        <div class="value">{val.cost}</div>
                                                    </div>
                                                    {/* <div>
                                                        <div class="title">Matches</div>
                                                        <i class="fa fa-gamepad"></i>
                                                        <div class="value">27</div>
                                                    </div>
                                                    <div>
                                                        <div class="title">Seats</div>
                                                        <i class="fas fa-chair"></i>
                                                        <div class="value"> {val.seats}</div>
                                                    </div> */}
                                                    <div>
                                                        <div class="title">Smoke</div>
                                                        <i class="fas fa-smoking-ban"></i>
                                                        <div class="title infinity">No</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="general">
                                            <h1>Ask</h1>
                                            <p>Need a Ride From {val.location} TO {val.destination} </p>
                                            <span class="more">Mouse over the card for more info</span>
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
                                            <form className="form1" class="columnR" key={idx} onSubmit={e => { return (HandleOffer(e), setUseButton(!useButton)) }} >
                                    <div class="cardS2">
                                        <div class="additional">
                                            <div class="user-card">
                                                <div class="points center">
                                                {
                                    useInfo.userData.pendingMessages.filter(message => message.askId === val.askId).length === 0
                                    && useInfo.userData._id !== val.userId &&
                                    <button type='submit' > Share </button>
                                    }
                                    </div>
                                        </div>
                                            <div class="more-info">
                                                <h1>Offer</h1>
                                                <div class="coords">
                                                    <span>{val.userName} </span>
                                                    <span>{val.time}</span>
                                                </div>
                                                <div class="coords">
                                                    <span>From {val.location}</span>
                                                    <span>TO {val.destination}</span>
                                                </div>  


                                                <div class="stats">
                                                    <div>
                                                        <div class="title">Cost</div>
                                                        <i class="fas fa-hand-holding-usd"></i>
                                                        <div class="coords">{val.cost}</div>
                                                    </div>
                                                    <div>
                                                        <div class="title">Car Type</div>
                                                        <i class="fas fa-car"></i>
                                                        <div class="coords">{val.catType}</div>
                                                    </div>
                                                    <div>
                                                        <div class="title">Seats</div>
                                                        <i class="fas fa-chair"></i>
                                                        <div class="coords"> {val.seats}</div>
                                                    </div>
                                                    <div>
                                                        <div class="title">Smoke</div>
                                                        <i class="fas fa-smoking-ban"></i>
                                                        <div class="title infinity">No</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="general">
                                            <h1>Offer</h1>
                                            <p>Have a Ride to Share From {val.location} TO {val.destination} </p>
                                            <span class="more">Mouse over the card for more info</span>
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
                                                    
                                                }
                                            </form>
                                        )
                                    }
                                })}
                            </section>

        </>
    )

}


export default Render;