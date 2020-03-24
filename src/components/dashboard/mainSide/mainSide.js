import React, { useContext, useEffect ,useState } from 'react';


import { userInfoContext } from '../../../contexts/userInfo.js'

function MainSide() {

    // to navigate between tabs
    const useInfo = useContext(userInfoContext);

    //to check password
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passState, setPassState] = useState(true);

    useEffect(() => {

        if (password === confirmPassword) {
          setPassState(false);
        } else {
          setPassState(true);;
        }
      },[password, confirmPassword])


      useEffect(()=>{
          useInfo.getInfo()
      },[])

    
    // useInfo.userData
    // console.log('=====' , useInfo.dataState);
    // if(useInfo.dataState){
    //     var { name, firstName, lastName } = useInfo.userData.info;
    // }
    return (

        <>
            {/* We created useInfo to wrap the message part in order to handle the async data problem */}
            {useInfo.dataState &&

                <div>
                    {useInfo.current === 'messages' &&

                        <section >
                            <h2>Messages</h2>
                            {/* {console.log(useInfo.userData.messages , 'test')} */}
                            {useInfo.userData.messages.length > 0 && useInfo.userData.messages.map((val, idx) => {
                                return <li key={idx}> {val} </li>
                            })}
                            {useInfo.userData.messages.length === 0 && <li>No messages</li>}
                        </section>
                    }

                    {useInfo.current === 'tasks' &&
                        <section>
                            <h2>Tasks</h2>
                            {(useInfo.userData.rides.length === 0 && useInfo.userData.drives.length === 0) && <li>No Tasks Yet!!</li>}

                            {useInfo.userData.rides.length > 0 && useInfo.userData.rides.map((val, idx) => {
                                return <div key={idx}> {val} </div>
                            })}

                            {useInfo.userData.drives.length > 0 && useInfo.userData.drives.map((val, idx) => {
                                return <div key={idx}> {val} </div>
                            })}
                        </section>
                    }


                    {useInfo.current === 'settings' &&
                        <section>
                            <h2>User Info</h2>

                            {

                                <form>
                                    <label>
                                        User Name: <input name='name' defaultValue={useInfo.userData.info.name} />
                                    </label>

                                    <label>
                                        First Name: <input name='firstName' defaultValue={useInfo.userData.info.firstName} />
                                    </label>
                                    <label>
                                        Last Name: <input name='lastName' defaultValue={useInfo.userData.info.lastName} />
                                    </label>
                                    <label>
                                        New Password: <input required type='password' name='password' onChange={e => setPassword(e.target.value)} />
                                    </label>
                                    <label>
                                        Confirm Password: <input required type='password' name='confirmPassword' onChange={e => setConfirmPassword(e.target.value)} />
                                    </label>


                                    <label>
                                        Smoker: <input type='checkbox' name='smoker' defaultValue='yes' />
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

                                    <button type='submit' disabled={passState}> UPDATE </button>
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