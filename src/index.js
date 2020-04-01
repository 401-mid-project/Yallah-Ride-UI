import React from 'react'
import ReactDOM from 'react-dom'
import App from './app';

import { BrowserRouter } from 'react-router-dom';

//context
import Logger from './contexts/logger.js';
import UserInfo from './contexts/userInfo.js';
import Poster from './contexts/poster.js';


class Main extends React.Component {
  render() {
    return (

      <>
        <BrowserRouter>


          <Poster>
          <UserInfo>
            <Logger>

              
              <App />

            </Logger>
          </UserInfo>
          </Poster>

        </BrowserRouter>
      </>

    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
