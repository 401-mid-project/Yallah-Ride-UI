import React from 'react'
import ReactDOM from 'react-dom'
import App from './app';

import {BrowserRouter} from 'react-router-dom';

//context
import Logger from './contexts/logger.js';


class Main extends React.Component {
    render(){
      return(

       <> 

       <BrowserRouter>
          <Logger>
           <App />
          </Logger>
       </BrowserRouter>
       
       </> 
       
      );
    }
  }

ReactDOM.render(<Main />, document.getElementById('root'));
