const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../models')

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		function (email, password, done) {
			db.Staff.findOne(
				{
					where: {
						email: email,
					},
				},
				function (err, user) {
					if (err) {
						return done(err)
					}
					if (!user) {
						return done(null, false, { message: 'Incorrect username or password.' })
					}
					if (!user.validPassword(password)) {
						return done(null, false, { message: 'Incorrect username or password.' })
					}
					return done(null, user)
				}
			)
		}
	)
)

// temp passport code
passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id, done) {
	db.Staff.findById(id, function (err, user) {
		done(err, user)
	})
})

// Exporting our configured passport
module.exports = passport
