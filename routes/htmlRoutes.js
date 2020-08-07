const path = require('path')

module.exports = (app) => {
	// send index
	app.get('/*', (req, res) => {
		res.sendFile(`${__dirname}/client/build/index.html`)
	})
}
