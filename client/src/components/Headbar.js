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
				<NavLink className="ourTitle" to="/" activeClassName={'focusNavLink'}>
					<img className="mb-3" width={50} height={50} src={logo} alt="" />
					BarberBooks
					<img className="mb-3" width={50} height={50} src={logo} alt="" />
				</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink className="homeButton" to="/" activeClassName={'focusNavLink'}>
						<i className="fas fa-home"></i> Home
					</NavLink>
					<NavLink
						to="/book"
						activeClassName={'focusNavLink'}
						style={{ marginRight: 10 }}
					>
						<i className="fas fa-book"></i> Book Now
					</NavLink>
					<NavLink to="/list" activeClassName={'focusNavLink'}>
						<i className="fas fa-clipboard-list"></i> Appointments
					</NavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Headbar
