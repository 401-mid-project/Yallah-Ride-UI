import React, { useContext, useEffect, useState } from 'react';
import cookie from 'react-cookies';


import { userInfoContext } from '../../../contexts/userInfo.js'
import {handleAskResponse} from './main-functions.js';


const API = 'http://localhost:3333';

function MainSide() {

    // to navigate between tabs
    const useInfo = useContext(userInfoContext);


    //to update user info every time data change
    useEffect(() => {
        useInfo.getInfo()
    }, [useInfo.dataState])


    let handleSubmit = (e)=> {
        e.preventDefault();


        let { userName , firstName , lastName ,smoker , gender ,password } = e.target ;
        let data = {info: {
          name: userName.value,
          firstName: firstName.value ,
          lastName: lastName.value ,
          smoker: smoker.value , 
          gender: gender.value ,
          password: password.value,
        }}
   
        handleUpdate(data);
    }

    let handleUpdate = async(data) => {

        let token = await cookie.load('auth');
        let output = await fetch(`${API}/dashboard/update` , {
            method:'PUT',
            body: JSON.stringify(data) ,
            headers: new Headers({
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
          })
      
          let response = await output.json();
          useInfo.getInfo();
          console.log('update' , response );
    }


    console.log('the problem' , useInfo.userData)
    return (

        <>
            {/* We created useInfo to wrap the message part in order to handle the async data problem */}
            {useInfo.dataState &&

                <div>
                    {useInfo.current === 'messages' &&

                        <section >
                            <h2>Pending Requests</h2>
                            {useInfo.userData.pendingMessages.length > 0 && useInfo.userData.pendingMessages.map((val, idx) => {
                                return <li key={idx}> {JSON.stringify(val)} </li>
                            })}
                            {useInfo.userData.pendingMessages.length === 0 && <li>Empty</li>}
                       
                            

                            <h2>Messages</h2>
                            <h2>Asks Messages:</h2>

                            {useInfo.userData.askMessages.length > 0 && useInfo.userData.askMessages.map((val, idx) => {
                                // console.log('ask object' , val);
                                return (
                                    <form key={idx} onSubmit={ e => handleAskResponse(e) } >

                                        <li> <a href='#'>{val.userName}</a> Offered you a ride ...</li>
                                        <li> My Ask Number:{val.askId.split(' ').pop()}</li>
                                        <input type='hidden' name='userId' value={val.userId} />
                                        <input type='hidden' name='askId' value={val.askId}/>
                                        <label>
                                        Accept <input type="radio" name="action" value="accept" checked/>
                                        </label>
                                        <label>
                                        Decline <input type="radio" name="action" value="decline"/>
                                        </label>
                                        <button type='submit'> Send </button>
                                    </form>
                                )
                                
                                // <li key={idx}> {JSON.stringify(val)} </li>
                            })}
                            {useInfo.userData.askMessages.length === 0 && <li>No messages</li>}
                        </section>
                    }

                    {useInfo.current === 'tasks' &&
                        <section>
                            <h2>Tasks</h2>

                            <h2> ASKS </h2>
                            {(useInfo.userData.rides.length === 0 && useInfo.userData.drives.length === 0) && <li>No Tasks Yet!!</li>}

                            {useInfo.userData.rides.length > 0 && useInfo.userData.rides.map((val, idx) => {
                                return <div key={idx}> {JSON.stringify(val)} </div>
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
                                    <label>
                                        User Name: <input required name='userName' defaultValue={useInfo.userData.info.name} />
                                    </label>

                                    <label>
                                        First Name: <input required name='firstName' defaultValue={useInfo.userData.info.firstName} />
                                    </label>
                                    <label>
                                        Last Name: <input required name='lastName' defaultValue={useInfo.userData.info.lastName} />
                                    </label>

                                    <input name='password' value={useInfo.userData.info.password} type='hidden'/>

                                    <label>
                                        Smoker: <input required type='checkbox' name='smoker' defaultValue='yes' />
                                    </label>

                                    <label>
                                        Gender:
          <label>
                                            Male: <input type='radio' name='gender' defaultValue='male' />
                                        </label>

                                        <label>
                                            Female: <input type='radio' name='gender' defaultValue='female' />
                                        </label>
                                    </label>

                                    <button type='submit'> UPDATE </button>
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