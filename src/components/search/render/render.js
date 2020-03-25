import React, { useState , useEffect, useContext } from 'react';
import cookie from 'react-cookies';

//context
import {postContext} from '../../../contexts/poster.js';

const API = 'http://localhost:3333';



function Render() {

    const [rides, setRides] = useState([]);
    const [drives, setDrives] = useState([]);

    const usePost = useContext(postContext);


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

        console.log('render res', response);
    };


    useEffect(()=>{
        getData();
    },[usePost.offer , usePost.ask]);

    // setInterval(() => {
    //     getData();
    // }, 5000);

    






    return (
        <>
           <section>
               <h2>Rides</h2>
                {rides.map((val , idx) => {
                    return(
                        <div key={idx}> {JSON.stringify(val)} </div>
                    )
                })}
           </section>

           <section>
               <h2>Drives</h2>
               {drives.map((val , idx) => {
                    return(
                        <div key={idx}> {JSON.stringify(val)} </div>
                    )
                })}
           </section>

        </>
    )

}


export default Render;