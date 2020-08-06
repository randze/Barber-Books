// react essentials
import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import './App.css'
import { Switch, Route, NavLink } from 'react-router-dom'
// components
import UserScheduler from './components/UserScheduler'
import Headbar from './components/Headbar'
import Footer from './components/Footer'
import ListAppointments from './components/ListAppointments'
import Login from './components/Login'
import Home from './components/Home'
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

// bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'

// fonts
import './fonts/cooper_black.ttf'

function App() {
	return (
		<>
			<Headbar />
			<div className="container">
				<div>
					<Switch>
						{' '}
						{/*more specific paths first*/}
						<Route path="/book">
							<UserScheduler />
						</Route>
						<Route path="/list">
							<ListAppointments />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default App
