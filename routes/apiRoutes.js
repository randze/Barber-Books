const db = require('../models')
const passport = require('../config/passport')

module.exports = function (app) {
	// // Route for retrieving users
	// app.get("/api/user", async (req, res) => {
	//     const userList = await db.User.find({}).populate('users')
	//     db.Appointments.populate
	//    res.json(userList)
	// })

	// Route for retrieving users
	app.get('/api/user', async (req, res) => {
		const userList = await db.User.find(
			{ __v: '0' },
			{ name: 1, email: 1, phone: 1, _id: 0 }
		)
			.populate('appointments', 'time -_id')
			.then(function (appointments) {
				res.json(appointments)
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.json(err)
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
