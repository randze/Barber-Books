// react essentials
import React from 'react'
import './App.css'
import { Switch, Route, NavLink } from 'react-router-dom'
// components
import Home from './components/Home'
import UserScheduler from './components/UserScheduler'
import VendorScheduler from './components/VendorScheduler'
import Login from './components/Login'
import StaffSignup from './components/StaffSignup'
import slots from './slots'
// calendar and time picker
import Calendar from 'rc-calendar'
import moment from 'moment'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import enUS from 'rc-calendar/lib/locale/en_US'
// css
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'
// temp timeslot data
import timeslotdata from './timeslot-data.json'
import Timeslots from './components/Timeslots'

function App() {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<NavLink exact to="/" activeClassName={'focusNavLink'}>
					Home
				</NavLink>
				<NavLink to="/book" activeClassName={'focusNavLink'}>
					Book Appointment
				</NavLink>
				<NavLink to="/login" activeClassName={'focusNavLink'}>
					Login
				</NavLink>
				<NavLink to="/signup" activeClassName={'focusNavLink'}>
					Signup
				</NavLink>
			</nav>
			<div className="container">
				<Switch>
					{' '}
					{/*more specific paths first*/}
					<Route path="/book">
						<UserScheduler />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<StaffSignup />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</>
	)
}

export default App
