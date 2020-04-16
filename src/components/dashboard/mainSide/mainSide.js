import React, { useContext, useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { userInfoContext } from '../../../contexts/userInfo.js'
import { handleAskResponse, handleOfferResponse } from './main-functions.js';
import imgMyTasks from '../../../img/12.jpg';
import imgMyTasks2 from '../../../img/11.jpg';


const API = 'https://yalla-server401.herokuapp.com';

function MainSide() {

    const useInfo = useContext(userInfoContext);
    let [buttonState, setButtonState] = useState(true)

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
            {useInfo.dataState &&
                <div>
                    {useInfo.current === 'messages' &&
                        <section >
                            <h2>Pending Requests</h2>
                            {useInfo.userData.pendingMessages.length > 0 && useInfo.userData.pendingMessages.map((val, idx) => {
                                if (val.askId) {
                                    return (<div className="cardx">
                                        <div className="right">
                                            <div className="author">
                                            <li> <p className="timee">{val.time}</p></li>
                                                <h1 className="h1t"> <a className="Asks" href='#'>TO {val.destination}</a> </h1>
                                            </div>
                                            <div className="separator"></div>
                                            <li> <p className="p1">The Payment will be {val.cost} JD </p></li>
                                            <li> <p className="p1">The State is {val.messageState}</p></li>
                                        </div>
                                        <section>
                                            <h5>{val.userName} Ask </h5><h6>From {val.location}</h6>
                                        </section>
                                        <img className="fab1" src="https://www.monro.com/wp-content/uploads/2019/09/service-tires-balance.png" />
                                    </div>)
                                } else {
                                    return (<div className="cardx">
                                        <div className="right">
                                            <div className="author">
                                            <li> <p className="timee">{val.time}</p></li>
                                                <h1 className="h1t"> <a className="Asks" href='#'>TO {val.destination}</a> </h1>
                                            </div>
                                            <div className="separator"></div>
                                            <li> <p className="p1">The Cost will be {val.cost} JD </p></li>
                                            <li> <p className="p1">Available Seats  {val.seats} </p></li>
                                            <li> <p className="p1">His Car Type {val.catType}</p></li>
                                            <li> <p className="p1">The State is {val.messageState}</p></li>
                                        </div>
                                        <section>
                                            <h5>{val.userName} Offer </h5><h6> From {val.location}</h6>
                                        </section>
                                        <img className="fab1" src="https://www.monro.com/wp-content/uploads/2019/09/service-tires-balance.png" />
                                    </div>
                                    )
                                }
                            })}
                            {useInfo.userData.pendingMessages.length === 0 && <li></li>}<section className="D-boo">
                            {useInfo.userData.askMessages.length > 0 && useInfo.userData.askMessages.map((val, idx) => {
                                console.log('ask object', val);
                                if (val.askId) {
                                    return (
                                        <form key={idx} onSubmit={e => { return (handleAskResponse(e), setButtonState(!buttonState)) }}>
                                            <a href="#">
                                                <figure>
                                                    <div class="date2"><span class="card-date-day">{val.askId.split(' ').pop()}</span><span class="card-date-month">Ask</span></div>
                                                    <figcaption><p><a className="Asksm" href='#'>{val.userName}</a> Offered you a ride ...</p><p><input type='hidden' name='userId' value={val.userId} />
                                                        <input type='hidden' name='askId' value={val.askId} />

                                                        {val.booked !== 'true' &&
                                                            <>
                                                                <label>
                                                                    Accept <input type="radio" name="action" value="accept" defaultChecked />&nbsp;&nbsp;
                                                                </label>
                                                                <label>
                                                                &nbsp;&nbsp; Decline <input type="radio" name="action" value="decline" />
                                                                </label>
                                                            </>
                                                        }</p>
                                                        <h4> <span>
                                                            {val.booked === 'true' && <li> Booked !!</li>}
                                                            {val.booked !== 'true' && <button className="button-send" type='submit'> Send </button>} </span></h4>
                                                    </figcaption>
                                                </figure></a>
                                        </form>
                                    )
                                }
                            })}
                            {useInfo.userData.askMessages.length === 0 && <li></li>}
                            {useInfo.userData.offerMessages.length > 0 && useInfo.userData.offerMessages.map((val, idx) => {
                                if (val.offerId) {
                                    console.log('offers', val)
                                    return (<form key={idx} onSubmit={e => { return (handleOfferResponse(e), setButtonState(!buttonState)) }}>
                                        <a href="#">
                                            <figure>
                                                <div class="date"><span class="card-date-day">{val.offerId.split(' ').pop()}</span><span class="card-date-month">Offer</span></div>
                                                <figcaption><p><a className="Asksm" href='#'>{val.userName}</a> Asked You To Share the Ride...</p><p><input type='hidden' name='userId' value={val.userId} />
                                                    <input type='hidden' name='offerId' value={val.offerId} />
                                                    {val.booked !== 'true' &&
                                                        <>
                                                            <label>
                                                                Accept <input type="radio" name="action" value="accept" defaultChecked />&nbsp;&nbsp;
                                                            </label>
                                                            <label>
                                                            &nbsp;&nbsp;  Decline <input type="radio" name="action" value="decline" />
                                                            </label>
                                                        </>
                                                    }</p>
                                                    <h4> <span>
                                                        {val.booked === 'true' && <li> Booked !!</li>}
                                                        {val.booked !== 'true' && <button type='submit'> Send </button>} </span></h4>
                                                </figcaption>
                                            </figure></a>
                                    </form>
                                    )
                                }
                            })}</section>
                            {useInfo.userData.offerMessages.length === 0 && <li></li>}
                        </section>
                        
                    }
                    {useInfo.current === 'tasks' &&
                        <section>
                            {(useInfo.userData.rides.length === 0 && useInfo.userData.drives.length === 0) && <li>No Tasks Yet!!</li>}

                            {useInfo.userData.rides.length > 0 && useInfo.userData.rides.map((val, idx) => {
                                return (
                                    <div class="containerc">
                                        <div class="card">
                                            <div class="card__image-container">
                                                <img class="card__image" src={imgMyTasks2} alt="" />
                                            </div>
                                            <svg  class="card__svg" viewBox="0 0 800 500">

                                                <path  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                                                <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                                            </svg>
                                            <div class="card__content">
                                                <h1 class="card__title">Ask</h1>
                                                <h3 >For a Ride From {val.location} TO {val.destination}</h3>
                                                <h3 > at {val.time}</h3>
                                                
                                                <h3 class="details">and the payment will be {val.cost} JD</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <br/>
                            {useInfo.userData.drives.length > 0 && useInfo.userData.drives.map((val, idx) => {
                                return (
                                    <div class="containerc">

                                        <div class="cardMT">
                                            <div class="card__image-container">
                                                <img class="card__image" src={imgMyTasks} alt="" />
                                            </div>

                                            <svg class="card__svg" viewBox="0 0 800 500">

                                                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                                                <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                                            </svg>

                                            <div class="card__content">
                                                <h1 class="card__title"> Offer </h1>
                                                <h3 >a Ride to Share From {val.location} TO {val.destination}</h3>
                                                <h3 >at {val.time}</h3>
                                                <h3 class="card__title">The Car Will Be {val.catType}</h3>
                                                <h3 class="card__title">And Have {val.seats} Seats Available </h3>
                                                <h3 class="details">The Cost will be {val.cost} JD </h3>
                                            </div>
                                        </div></div>
                                )
                            })}
                        </section>
                    }
                    {useInfo.current === 'settings' &&
                        <section>
                            <h2>User Info</h2>

                            {

                                <form className="form1" onSubmit={e => handleSubmit(e)}>

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