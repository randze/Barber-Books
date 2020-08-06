const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const StaffSchema = new Schema({
	email: {
		type: String,
		trim: true,
		required: 'Please enter your email',
	},
	password: {
		type: Number,
		required: 'Please enter your phone number',
	},
	createdAt: { type: Date, default: Date.now },
})

StaffSchema.methods = {
	checkPassword: async function (inputPassword) {
		return await bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: async (plainTextPassword) => {
		return await bcrypt.hashSync(plainTextPassword, 10)
	},
}

// Define hooks for pre-saving
StaffSchema.pre('save', async function (next) {
	if (!this.password) {
		next()
	} else {
		this.password = await this.hashPassword(this.password)
		next()
	}
})

module.exports = mongoose.model('Staffs', StaffSchema)
