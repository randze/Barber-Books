import React from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom'
import UserScheduler from './components/UserScheduler'
import VendorScheduler from './components/VendorScheduler'
import Login from './components/Login'
import Calendar from 'rc-calendar'
import 'rc-calendar/assets/index.css';

function App() {
  return (
    <div className="container">
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <div>
      <Switch> {/*more specific paths first*/}
        <Route path='/about'><VendorScheduler/></Route>
        <Route path='/'><Login/></Route>
      </Switch>
      <Calendar/>
      </div>
    </div>
  );
}

export default App;
