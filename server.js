const express = require('express')
const mongoose = require('mongoose')
const history = require('connect-history-api-fallback')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(history())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
} else {
	app.use(express.static('client/public'))
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

// app routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

// app listener
app.listen(PORT, function () {
	console.log(`🌎 ==> API server now on port ${PORT}!`)
})
