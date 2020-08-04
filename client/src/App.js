// react essentials
import React from 'react';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom'
// components
import UserScheduler from './components/UserScheduler'
import VendorScheduler from './components/VendorScheduler'
import Login from './components/Login'
import slots from './slots'
// calendar and time picker
import Calendar from 'rc-calendar'
import moment from 'moment'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import enUS from 'rc-calendar/lib/locale/en_US'
// css
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'



function App() {
  return (
    <div className="container">
      <NavLink exact to='/' activeClassName={'focusNavLink'}>Home</NavLink>
      <NavLink to='/book' activeClassName={'focusNavLink'}>Book Appointment</NavLink>
      <div>
        <Switch> {/*more specific paths first*/}
          <Route path='/book'><UserScheduler /></Route>
          <Route exact path='/'><Login /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
