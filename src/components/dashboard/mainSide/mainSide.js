import React, { useContext, useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { userInfoContext } from '../../../contexts/userInfo.js'
import { handleAskResponse, handleOfferResponse } from './main-functions.js';


const API = 'http://localhost:3333';

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
                                                <h1 className="h1t"> <a className="Asks" href='#'>{val.userName} Asks</a> </h1>
                                            </div>
                                            <div className="separator"></div>
                                            <li> <p className="p1">Location: {val.location} </p></li>
                                            <li> <p className="p1">{val.time}</p></li>
                                            <li> <p className="p1">State: {val.messageState}</p></li>
                                        </div>
                                        <section>
                                            <h5>TO {val.destination} </h5><h6> {val.cost} JD</h6>
                                        </section>
                                        <div className="fab1">
                                            <i className="fa fa-arrow-down fa-3x"></i>
                                        </div>
                                    </div>)
                                } else {
                                    return (<div className="cardx">
                                        <div className="right">
                                            <div className="author">
                                                <h1 className="h1t"> <a className="Asks" href='#'>{val.userName} Offers</a> </h1>
                                            </div>
                                            <div className="separator"></div>
                                            <li> <p className="p1">Location: {val.location} </p></li>
                                            <li> <p className="p1">{val.time}</p></li>
                                            <li> <p className="p1">Seats: {val.seats}</p></li>
                                            <li> <p className="p1">Car: {val.catType}</p></li>
                                            <li> <p className="p1">State: {val.messageState}</p></li>
                                        </div>
                                        <section>
                                            <h5>TO {val.destination} </h5><h6> {val.cost} JD</h6>
                                        </section>
                                        <div className="fab1">
                                            <i className="fa fa-arrow-down fa-3x"></i>
                                        </div>
                                    </div>
                                    )
                                }
                            })}
                            {useInfo.userData.pendingMessages.length === 0 && <li>Empty</li>}
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
                                                                    Accept <input type="radio" name="action" value="accept" defaultChecked />
                                                                </label>
                                                                <label>
                                                                    Decline <input type="radio" name="action" value="decline" />
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
                            })}
                            {useInfo.userData.askMessages.length === 0 && <li>No messages</li>}
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
                                                                Accept <input type="radio" name="action" value="accept" defaultChecked />
                                                            </label>
                                                            <label>
                                                                Decline <input type="radio" name="action" value="decline" />
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
                            })}
                            {useInfo.userData.offerMessages.length === 0 && <li>No messages</li>}
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
                                                <img class="card__image" src="https://lh3.googleusercontent.com/R_bkzuTCHuLEceboxp-nboQk8viruGGETXouQ1xR_S8AWHOpf8Xuw-N4X8YZoZOhxuLzW9iQCWVbiEowmlMF7zJDZyZvlQZU54VWbRqY5grvCx_00jB648GCxZ7-sdYv_qguadVCi69LEf20VrXxxI8OAzPPRLp3Jx7bzppFqhgK7QDJJnFttckZaUd2_Ctub477tDYlDCl294MemyQaXYQv2Idm2WSe2pffHvvrmJvoYU6HzDZTtUuWEmuJPQN1_u4h8jnYE2zNFyEkDCC2uHHbe8iqXqC8nmC1cchQSiBe6On0SeFrYGcHQc5kQBaDECRzFgewBjIf-U6P9DyYelc6F_Ph1kyXReKjw-5J6egwCLc-vx6VxnngpS619bXY1QDzddHAyww8EXeyo5U2t4YYU_pM600lQ1AibwvHpTddj5j7-AzgpwYuSPh970z6A87wWFkxWij6JbKFY5O6GZtyOs8uxLWtzsyOFE4A2CZhGxMUf798Sjn7LUJ_UPlcwCJQ4dcYN6vol5XqvoKXaWKBxvZsGtiKREc25i4zb6351qLw3JKHE5uK2EB2NgvNhQeeZKhpkK_bl8N-xs8EP9SEkPxU158zACeqPbs9hc7faDSjJKoa7fRxhg1nUVGznHjoUmDOKyeKznmjD5i6iUOIVgUEyPq3X8c4sIz-5ee_7HN34F_ASNm5uXPCUg=w822-h657-no" alt="" />
                                            </div>
                                            <svg class="card__svg" viewBox="0 0 800 500">

                                                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                                                <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                                            </svg>
                                            <div class="card__content">
                                                <h1 class="card__title">{val.userName} Asks</h1>
                                                <h3 >{val.time}</h3>
                                                <h3 >Location: {val.location}</h3>
                                                <p >TO {val.destination}
                                                </p>
                                                <h3 class="details">Cost: {val.cost} JD</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {useInfo.userData.drives.length > 0 && useInfo.userData.drives.map((val, idx) => {
                                return (
                                    <div class="containerc">

                                        <div class="card">
                                            <div class="card__image-container">
                                                <img class="card__image" src="https://lh3.googleusercontent.com/R_bkzuTCHuLEceboxp-nboQk8viruGGETXouQ1xR_S8AWHOpf8Xuw-N4X8YZoZOhxuLzW9iQCWVbiEowmlMF7zJDZyZvlQZU54VWbRqY5grvCx_00jB648GCxZ7-sdYv_qguadVCi69LEf20VrXxxI8OAzPPRLp3Jx7bzppFqhgK7QDJJnFttckZaUd2_Ctub477tDYlDCl294MemyQaXYQv2Idm2WSe2pffHvvrmJvoYU6HzDZTtUuWEmuJPQN1_u4h8jnYE2zNFyEkDCC2uHHbe8iqXqC8nmC1cchQSiBe6On0SeFrYGcHQc5kQBaDECRzFgewBjIf-U6P9DyYelc6F_Ph1kyXReKjw-5J6egwCLc-vx6VxnngpS619bXY1QDzddHAyww8EXeyo5U2t4YYU_pM600lQ1AibwvHpTddj5j7-AzgpwYuSPh970z6A87wWFkxWij6JbKFY5O6GZtyOs8uxLWtzsyOFE4A2CZhGxMUf798Sjn7LUJ_UPlcwCJQ4dcYN6vol5XqvoKXaWKBxvZsGtiKREc25i4zb6351qLw3JKHE5uK2EB2NgvNhQeeZKhpkK_bl8N-xs8EP9SEkPxU158zACeqPbs9hc7faDSjJKoa7fRxhg1nUVGznHjoUmDOKyeKznmjD5i6iUOIVgUEyPq3X8c4sIz-5ee_7HN34F_ASNm5uXPCUg=w822-h657-no" alt="" />
                                            </div>

                                            <svg class="card__svg" viewBox="0 0 800 500">

                                                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                                                <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                                            </svg>

                                            <div class="card__content">
                                                <h1 class="card__title">{val.userName} Offers</h1>
                                                <h3 >{val.time}</h3>
                                                <h3 >Location: {val.location}</h3>
                                                <h3 class="card__title">Car: {val.catType}</h3>
                                                <h3 class="card__title">Seats: {val.seats}</h3>
                                                <p >TO {val.destination}
                                                </p>
                                                <h3 class="details">Cost: {val.cost} JD</h3>
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