import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
//API
import API from '../utils/API'

function StaffSignup(props) {
	let [formObject, setFormObject] = useState({ email: '', password: '' })

	function handleInputChange(event) {
		const { name, value } = event.target
		setFormObject({ ...formObject, [name]: value })
	}

	async function handleFormSubmit(event) {
		event.preventDefault()

		console.log('signing up')

		let hasBlank = false
		for (let key in formObject) {
			if (formObject[key] === '') {
				hasBlank = true
			}
		}
		if (!hasBlank) {
			try {
				await API.signup({
					email: formObject.email,
					password: formObject.password,
				})
				setFormObject({
					email: '',
					password: '',
				})
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<>
			<Row>
				<Col>
					<Form>
						<Form.Group controlId="formEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								name="email"
								value={formObject.email}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder=""
								name="password"
								value={formObject.password}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit" onClick={handleFormSubmit}>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default StaffSignup

{
	/* <Form.Group controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="" name='name' value={formObject.name} onChange={handleInputChange} />
					</Form.Group> */
}
