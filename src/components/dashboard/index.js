import React from 'react';
import '../../style/dashboard.scss';
//components 
import Header from '../header/inHeader.js';
import Left from './leftSide/leftSide.js';
import Main from '../dashboard/mainSide/mainSide.js';


function Dashboard() {


  return (
    <>
      <div className="wrapper">
        <Left />
        <div className="main_container">
          <Header />
          <div className="containerx">
            <div className="item">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Dashboard;