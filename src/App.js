import React from 'react';
import horse from './horse.svg';
import Android from './Components/Android';
import Settings from './Components/Settings';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
          <img src={horse} className="logoStyle" alt="logo" />

          <div className="svg-wrapper">
            <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
              <rect className="shape" height="60" width="320" />

            </svg>
            <div className="text">NAVAND</div>
          </div>

          <div className="content-container">
            <Settings />
          </div>

          <div class="android" >
            <Android />
          </div>

   
      </div>
    );
  }
}

export default App;
