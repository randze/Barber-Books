import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'

import bg from '../imgs/bg.jpg'

function Home() {
	return (
		<div>
			<Jumbotron fluid className="ourJumbo">
				<Container>
					<h1>Book your next appointment now!</h1>
					<p>Welcome to Barber Books, your home for booking your next haircut.</p>
				</Container>
			</Jumbotron>
		</div>
	)
}

export default Home

{
	/* <img style={{ maxWidth: '100%' }} src={bg} alt="" /> */
}
