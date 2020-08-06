import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

function CheckAuth() {
	const [loading, setLoading] = React.useState(true)
	const [authenticated, setAuthenticated] = React.useState(false)
	// call the function here
	React.useEffect(() => {
		// check token here to see if they have it in local storage
		const data = localStorage.token ? true : false

		if (data == true) {
			setLoading(false)
			setAuthenticated(true)
		}

		if (data == false) {
			setLoading(false)
			setAuthenticated(false)
		}

		// if valid setAuthenticated to true else set to false
		// setLoading to false after all that shit is done
		console.log('use effect running.')
	}, [])

	// if token matches setAuthenticated and setLoading

	if (loading) {
		return <h1>loading</h1>
	}

	if (!loading && authenticated) {
		return <h1> you are auth and loading is done</h1>
	}

	if (!loading && !authenticated) {
		return (
			<>
				<Redirect to="/login" />
			</>
		)
	}

	return <div>please login</div>
}

export default CheckAuth
