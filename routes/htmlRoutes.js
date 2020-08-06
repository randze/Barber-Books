const path = require('path')

const db = require('../models')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')

passport.use(db.Staff.createStrategy())
passport.serializeUser(db.Staff.serializeUser())
passport.deserializeUser(db.Staff.deserializeUser())

module.exports = (app) => {
	// send index
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, './client/build/index.html'))
	})

	// login routes
	app.post('/login', (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err)
			}

			if (!user) {
				return res.redirect('/login?info=' + info)
			}

			req.logIn(user, function (err) {
				if (err) {
					return next(err)
				}

				return res.redirect('/')
			})
		})(req, res, next)
	})

	app.get('/login', (req, res) =>
		res.sendFile(path.join(__dirname, './client/build/login.html'))
	)

	app.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
		res.sendFile(path.join(__dirname, './client/build/indextest.html'))
	)

	app.get('/staff', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
		res.sendFile(path.join(__dirname, './client/build/staff.html'))
	)

	app.get('/user', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
		res.send({ user: req.user })
	)
}
