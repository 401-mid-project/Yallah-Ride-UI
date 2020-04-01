import React, { useContext, useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { userInfoContext } from '../../../contexts/userInfo.js'
import { handleAskResponse, handleOfferResponse } from './main-functions.js';


const API = 'http://localhost:3333';

function MainSide() {

    // to navigate between tabs
    const useInfo = useContext(userInfoContext);
    let [buttonState, setButtonState] = useState(true)


    //to update user info every time data change
    useEffect(() => {
        useInfo.getInfo()
    }, [useInfo.dataState, buttonState])

    console.log(buttonState, '<===============');
    let handleSubmit = (e) => {
        e.preventDefault();


        let { userName, firstName, lastName, smoker, gender, password } = e.target;
        let data = {
            info: {
                name: userName.value,
                firstName: firstName.value,
                lastName: lastName.value,
                smoker: smoker.value,
                gender: gender.value,
                password: password.value,
            }
        }

        handleUpdate(data);
    }

    let handleUpdate = async (data) => {

        let token = await cookie.load('auth');
        let output = await fetch(`${API}/dashboard/update`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
        })

        let response = await output.json();
        useInfo.getInfo();
        console.log('update', response);
    }


    console.log('the problem', useInfo.userData)
    return (

        <>
            {/* We created useInfo to wrap the message part in order to handle the async data problem */}
            {useInfo.dataState &&

                <div>
                    {useInfo.current === 'messages' &&

                        <section >
                            <h2>Pending Requests</h2>
                            {useInfo.userData.pendingMessages.length > 0 && useInfo.userData.pendingMessages.map((val, idx) => {
                                if (val.askId) {
                                    return (<fieldset key={idx}>
                                        <legend>Ask</legend>
                                        <a href='#'>
                                            <p> {val.userName} </p>
                                        </a>
                                        <li> Destination: {val.destination} </li>
                                        <li> Location: {val.location} </li>
                                        <li> Time: {val.time} </li>
                                        <li> Cost: {val.cost} JD </li>
                                        <li>State: {val.messageState} </li>
                                    </fieldset>)
                                } else {
                                    return (<fieldset key={idx}>
                                        <legend>Offer</legend>
                                        <a href='#'>
                                            <p> {val.userName} </p>
                                        </a>
                                        <li> Destination: {val.destination} </li>
                                        <li> Location: {val.location} </li>
                                        <li> Time: {val.time} </li>
                                        <li> Cost: {val.cost} JD </li>
                                        <li>State: {val.messageState} </li>
                                        <li>car: {val.catType} </li>
                                        <li>seats: {val.seats} </li>

                                    </fieldset>)
                                }



                                // return <li key={idx}> {JSON.stringify(val)} </li>
                            })}
                            {useInfo.userData.pendingMessages.length === 0 && <li>Empty</li>}



                            <h2>Messages</h2>
                            <h2>Asks Messages:</h2>

                            {useInfo.userData.askMessages.length > 0 && useInfo.userData.askMessages.map((val, idx) => {
                                console.log('ask object', val);
                                if (val.askId) {
                                    return (

                                        <form key={idx} onSubmit={e => { return (handleAskResponse(e), setButtonState(!buttonState)) }}>

                                            <li> <a href='#'>{val.userName}</a> Offered you a ride ...</li>
                                            <li> My Ask Number:{val.askId.split(' ').pop()}</li>
                                            <input type='hidden' name='userId' value={val.userId} />
                                            <input type='hidden' name='askId' value={val.askId} />

                                            {val.booked !== 'true' &&
                                                <>
                                                    <label>
                                                        Accept <input type="radio" name="action" value="accept" defaultChecked />
                                                    </label>
                                                    <label>
                                                        Decline <input type="radio" name="action" value="decline" />
                                                    </label>
                                                </>
                                            }

                                            {val.booked === 'true' && <li> Booked !!</li>}
                                            {val.booked !== 'true' && <button type='submit'> Send </button>}
                                        </form>
                                    )
                                }
                                // <li key={idx}> {JSON.stringify(val)} </li>
                            })}
                            {useInfo.userData.askMessages.length === 0 && <li>No messages</li>}


                            {/*  */}

                            <h2>Offers Messages:</h2>

                            {useInfo.userData.offerMessages.length > 0 && useInfo.userData.offerMessages.map((val, idx) => {
                                if (val.offerId) {

                                    console.log('offers', val)
                                    return (
                                        <form key={idx} onSubmit={e => { return (handleOfferResponse(e), setButtonState(!buttonState)) }}>

                                            <li> <a href='#'>{val.userName}</a> Asked You To Share the Ride...</li>
                                            <li> My Offer Number:{val.offerId.split(' ').pop()}</li>
                                            <input type='hidden' name='userId' value={val.userId} />
                                            <input type='hidden' name='offerId' value={val.offerId} />

                                            {val.booked !== 'true' &&
                                                <>
                                                    <label>
                                                        Accept <input type="radio" name="action" value="accept" defaultChecked />
                                                    </label>
                                                    <label>
                                                        Decline <input type="radio" name="action" value="decline" />
                                                    </label>
                                                </>
                                            }

                                            {val.booked === 'true' && <li> Booked !!</li>}
                                            {val.booked !== 'true' && <button type='submit'> Send </button>}
                                        </form>
                                    )
                                }

                                // return <li key={idx}> {JSON.stringify(val)} </li>
                            })}
                            {useInfo.userData.offerMessages.length === 0 && <li>No messages</li>}



                            {/*  */}
                        </section>
                    }






                    {useInfo.current === 'tasks' &&


                        <section>


                            {(useInfo.userData.rides.length === 0 && useInfo.userData.drives.length === 0) && <li>No Tasks Yet!!</li>}

                            {useInfo.userData.rides.length > 0 && useInfo.userData.rides.map((val, idx) => {
                                return (
                                    <div className="card">
                                        <div className="right">
                                           
                                            <div className="author">

                                                <img src="john.png" alt="" />
                                                <h1 className="h1t"> <a className="Asks" href='#'>{val.userName} Asks</a> </h1>
                                            </div>
                                            <div className="separator"></div>
                                            <li> <p className="p1">Destination: {val.destination}</p></li>
                                            <li> <p className="p1">{val.time}</p></li>
                                            <li> <p className="p1">State: {val.messageState}</p></li>
                                        </div>
                                        <section>
                                         <h5>TO {val.location} </h5><h6> {val.cost} JD</h6>
                                        </section>
                                        
                                        

                                        <div className="fab1">
                                            <i className="fa fa-arrow-down fa-3x"></i>
                                        </div>
                                    </div>


                                    // <div key={idx}> {JSON.stringify(val)} </div>
                                )
                            })}

                            <h2> Offers </h2>

                            {useInfo.userData.drives.length > 0 && useInfo.userData.drives.map((val, idx) => {
                                return <div key={idx}> {JSON.stringify(val)} </div>
                            })}
                        </section>
                    }


                    {useInfo.current === 'settings' &&
                        <section>
                            <h2>User Info</h2>

                            {

                                <form onSubmit={e => handleSubmit(e)}>

                                    <div className="input-group">
                                        <input name='userName' placeholder="User Name" required defaultValue={useInfo.userData.info.name} />
                                    </div>

                                    <div className="input-group">
                                        <input name='firstName' placeholder="First Name" required defaultValue={useInfo.userData.info.firstName} />
                                    </div>

                                    <div className="input-group">
                                        <input name='lastName' placeholder="Last Name" required defaultValue={useInfo.userData.info.lastName} />
                                    </div>

                                    <div className="input-group">
                                        <input required type='password' name='password' id='password' placeholder="Password" value={useInfo.userData.info.password} type='hidden' />
                                    </div>

                                    <div className='input_font_color' className='divs'><a><label className='input_font_color' for="s1">Smoker </label>
                                        <input id="s1" type='checkbox' class="switch" name='smoker' defaultValue='yes' />
                                        &nbsp; Male <input id="r1" type='radio' name='gender' defaultValue='male' /></a><a> &nbsp;
                                        Female  <input id="r2" type='radio' name='gender' defaultValue='female' /></a>
                                    </div>

                                    <button className="ghost" type='submit'> UPDATE </button>
                                </form>
                            }
                        </section>
                    }
                </div>

            }


        </>
    )
}


export default MainSide;