const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StaffSchema = new Schema({
	email: {
		type: String,
		trim: true,
		required: 'Please enter your email',
	},
	password: {
		type: String,
		trim: true,
		required: 'Please enter your password',
	},
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Staffs', StaffSchema)
