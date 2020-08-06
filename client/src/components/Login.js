import React, { useState, useRef } from 'react'

function Login() {
	const [userData, setUserData] = useState({
		name: '',
		email: localStorage.email,
		password: '',
		rememberMe: true,
	})

	const inputEmail = useRef()
	const inputPassword = useRef()

	function handleInputChange(event) {
		const { id, value } = event.target //

		setUserData({ ...userData, [id]: value })
	}

	function handleCheckbox() {
		setUserData({ ...userData, rememberMe: !userData.rememberMe })
	}

	function loginComplete(loginData) {
		// save the active session
		localStorage.session = loginData.session
	}

	async function loginUser(event) {
		event.preventDefault()

		if (userData.email === '') {
			inputEmail.focus()
			return
		}

		if (userData.password === '' || userData.password.length < 8) {
			inputPassword.current.focus()
			return
		}
	}

	return (
		<>
			<div className="row max-width-none">
				<div className="col-sm-3 col-lg-7 min-height-100 login-bg"></div>
				<div className="col-xs-12 col-sm-9 col-lg-5 min-height-100 myLogin">
					<h2>Staff Portal Sign-In</h2>
					<form>
						<label HTMLfor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input
							value={userData.email}
							onChange={handleInputChange}
							ref={inputEmail}
							id="email"
							type="email"
							className="form-control"
						/>
						<div id="loginMsg" className="form-text"></div>
						<div>
							<label for="exampleInputPassword1" className="form-label">
								Password
							</label>
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
						<input
							type="checkbox"
							checked={userData.rememberMe}
							onChange={handleCheckbox}
						/>
						<label class="text-secondary" for="rememberMe">
							Remember Me
						</label>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
