import React from 'react'
import { NavLink } from 'react-router-dom'

import { Nav, Form, Button, Row, Col, Navbar } from 'react-bootstrap'

function Headbar() {
	return (
		// #735127 6e3d00
		<Navbar expand="lg">
			<Navbar.Brand href="#home">BarberBooks</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink exact to="/" activeClassName={'focusNavLink'}>
						Home
					</NavLink>
					<NavLink to="/book" activeClassName={'focusNavLink'}>
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
