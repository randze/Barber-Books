import React from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom'
import UserScheduler from './components/UserScheduler'
import VendorScheduler from './components/VendorScheduler'
import Login from './components/Login'

function App() {
  return (
    <div className="container">
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <div>
      <Switch>
        <Route path='/'><Login/></Route>
        <Route path='/about'><VendorScheduler/></Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;
