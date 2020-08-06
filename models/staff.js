const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const StaffSchema = new Schema({
	username: String,
	password: String,
	createdAt: { type: Date, default: Date.now },
})

StaffSchema.plugin(passportLocalMongoose)

const UserDetails = mongoose.model('userInfo', StaffSchema, 'userInfo')

module.exports = UserDetails
