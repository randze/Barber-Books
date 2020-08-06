const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('./config/passport')

const path = require('path')
const db = require('./models')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// passport boilerplate code
app.use(
	session({ secret: 'letsgoepa', resave: false, saveUninitialized: false })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

// serve static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
}

// mongoose connect
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/epascheduler',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}
)

app.use((req, res, next) => {
	console.log('req.session', req.session)
	next()
})

// app routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

// app listener
app.listen(PORT, function () {
	console.log(`🌎 ==> API server now on port ${PORT}!`)
})
