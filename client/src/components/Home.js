import React from 'react'
import { Jumbotron, Container, Card, Row, Col } from 'react-bootstrap'

function Home() {
	return (
		<div>
			<Jumbotron fluid className="ourJumbo">
				<Container>
					<h1>Book your next appointment now !</h1>
					<br />
					<h6>Welcome to Barber Books, your home for booking your next haircut.</h6>
				</Container>
			</Jumbotron>
			<Container>
				<h2>Why use Barber Books?</h2>
				<p>
					We’ve created Barber Books, an online tool that can help barbers and clients
					have a quick and efficient way to manage and create bookings for haircuts.
				</p>
			</Container>

			<Container style={{ minHeight: '500px' }}>
				<h3>Brought to you by: </h3>
				<Row>
					<Col sm={12} md={4}>
						<Card>
							<Card.Body>
								<Card.Title>Eddi Esteban</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Software Developer</Card.Subtitle>
								<Card.Text>
									I develop applications using the MERN stack. Follow me and see the sorts of
									projects I work on.{' '}
								</Card.Text>
								<Card.Link href="https://github.com/EddiEsteban" target="_blank">
									Github ‍<i className="fab fa-github"></i>
								</Card.Link>
								<Card.Link
									href="https://eddiesteban.github.io/My-Portfolio/portfolio.html"
									target="_blank"
								>
									Portfolio 🏆
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={12} md={4}>
						<Card>
							<Card.Body>
								<Card.Title>Patrick Kuo</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Web Developer</Card.Subtitle>
								<Card.Text>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. FTW !
								</Card.Text>
								<Card.Link href="https://github.com/randze" target="_blank">
									<p>
										GitHub <i className="fab fa-github"></i>
									</p>
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={12} md={4}>
						<Card>
							<Card.Body>
								<Card.Title>Avi Balsingh</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Full Stack Developer</Card.Subtitle>
								<Card.Text>
									Click the link below if you want to check out my GitHub profile!
								</Card.Text>
								<Card.Link href="https://github.com/Spntrx" target="_blank">
									<p>
										GitHub <i className="fab fa-github"></i>
									</p>
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Home
