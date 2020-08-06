import React, { useState, useRef } from 'react'

import API from '../utils/API'

function Login() {
	// DECLARATIVE FORM OF PROGRAMMING
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	const inputEmail = useRef()
	const inputPassword = useRef()

	function handleInputChange(e) {
		const { id, value } = e.target //

		setUserData({ ...userData, [id]: value })
	}

	async function loginUser(e) {
		e.preventDefault()

		// if (userData.email === '') {
		// 	inputEmail.focus()
		// 	return
		// }

		// if (userData.password === '') {
		// 	inputPassword.current.focus()
		// 	return
		// }

		console.log(`useremail:`, userData.email)
		console.log(`userpassword:`, userData.password)
		const apiResult = await API.stafflogin({
			email: userData.email,
			password: userData.password,
		})

		if (apiResult.status === 200) {
			console.log('do this shit')
			// redirect here
			// create token in local storage
			const data = JSON.stringify(apiResult)
			localStorage.setItem('token', data)
		}
		console.log('1')

		console.log('login response:', apiResult)
	}

	return (
		<div>
			<hr />
			<h1>Login</h1>

			<div class="container">
				<div class="card">
					<div class="card-body">
						<form role="form">
							<div class="form-group">
								<label for="userEmail">Email Address</label>
								<input
									value={userData.email}
									onChange={handleInputChange}
									ref={inputEmail}
									id="email"
									type="email"
									class="form-control"
								/>
							</div>
							<div class="form-group">
								<label for="userPassword">Password</label>
								<input
									value={userData.password}
									onChange={handleInputChange}
									ref={inputPassword}
									id="password"
									type="password"
									class="form-control"
								/>
							</div>
							<button onClick={loginUser} type="button" class="btn btn-primary submit">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
