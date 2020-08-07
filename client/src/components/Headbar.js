import React from 'react'
import { NavLink } from 'react-router-dom'

import { Nav, Navbar } from 'react-bootstrap'

// imgs
import logo from '../imgs/barber.png'

function Headbar() {
	return (
		// #735127 6e3d00
		<Navbar expand="lg">
			<Navbar.Brand href="#home">
				{' '}
				<NavLink exact to="/" activeClassName={'focusNavLink'}>
					<img className="mb-3" width={50} height={50} src={logo} alt="" />
					BarberBooks
					<img className="mb-3" width={50} height={50} src={logo} alt="" />
				</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink className="homeButton" exact to="/" activeClassName={'focusNavLink'}>
						Home
					</NavLink>
					<NavLink
						to="/book"
						activeClassName={'focusNavLink'}
						style={{ marginRight: 10 }}
					>
						Book Appointment
					</NavLink>
					<NavLink to="/list" activeClassName={'focusNavLink'}>
						List Appointments
					</NavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Headbar
