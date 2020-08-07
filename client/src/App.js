// react essentials
import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
// components
import UserScheduler from './components/UserScheduler'
import Headbar from './components/Headbar'
import Footer from './components/Footer'
import ListAppointments from './components/ListAppointments'
import Home from './components/Home'

// css
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'

// bootstrap
import { Container } from 'react-bootstrap'

// fonts
import './fonts/cooper_black.ttf'

function App() {
	return (
		<>
			<Headbar />
			<Container>
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
					<Route path="*">
						<Home />
					</Route>
				</Switch>
			</Container>
			<Footer />
		</>
	)
}

export default App
