const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter your full name',
	},
	email: {
		type: String,
		trim: true,
		required: 'Please enter your email',
	},
	phone: {
		type: Number,
		required: 'Please enter your phone number',
	},
	appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Users', UserSchema)
