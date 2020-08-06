const db = require('../models')
const passport = require('../config/passport')

module.exports = function (app) {
	// // Route for retrieving users
	// app.get("/api/user", async (req, res) => {
	//     const userList = await db.User.find({}).populate('users')
	//     db.Appointments.populate
	//    res.json(userList)
	// })

	// Route for retrieving a Product by id and populating it's Review.
	app.get('/api/user', async (req, res) => {
		// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
		// db.User.populate('users')
		const userList = await db.User.find({})
			.populate('users')
			.then(function (appointments) {
				// If we were able to successfully find an Product with the given id, send it back to the client
				res.json(appointments)
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.json(err)
			})
	})

	// Route for retrieving appointments
	app.get('/api/appointments', (req, res) => {
		db.Appointments.find({}, function (err, appointments) {
			if (err) {
				res.send('Something went wrong!')
				next()
			}
			res.json(appointments)
		})
	})

	// login test route
	app.post('/staff/signup', (req, res) => {
		db.Staff.create({
			email: req.body.email,
			password: req.body.password,
		})
			.then(() => {
				res.redirect(307, '/api/login')
			})
			.catch((err) => {
				res.status(401).json(err)
			})
	})

	app.post('/api/login', passport.authenticate('local'), (req, res) => {
		// Sending back a password, even a hashed password, isn't a good idea
		res.json({
			email: req.user.email,
			id: req.user.id,
		})
	})

	app.post('/api/user', async (req, res) => {
		console.log(`[POST] /appointments, body:`, req.body)
		try {
			// first create a new user if not already exists
			let postingUser
			let userMatch = await db.User.find({ email: req.body.email }).limit(1)

			if (userMatch.length == 0) {
				console.log(` .. user does not exist, creating them!`)
				// create the user
				postingUser = await db.User.create({
					name: req.body.name,
					email: req.body.email,
					phone: req.body.phone,
				})
				console.log(` ... added the user, id=${postingUser._id}`)
			} else {
				postingUser = UserMatch[0]
				console.log(` ! user already exists, using them, id=${postingUser._id}`)
			}

			console.log(`.. checking if user is unique:`, postingUser)

			// save the Appointments
			let postedAppointment = await db.Appointments.create({
				time: req.body.time,
			})
			console.log(`.. * created Appointment: id=${postedAppointment._id}`)

			// save the Appointment-id to the user list
			console.log(` about to add Appointment to the users Appointment list:`)

			const updateResult = await db.User.updateOne(
				{ name: req.body.name },
				{ $push: { appointments: postedAppointment._id } }
			)
			console.log(` ... finished adding the Appointment to the user: `, updateResult)
			res.send({ status: true, message: 'Successfully added Appointment' })
		} catch (err) {
			console.log(`x sorry invalid Appointment`, err)
			res.send({
				status: false,
				message: `Sorry unable to create Appointment: ${err.message}`,
			})
		}
	})
}
