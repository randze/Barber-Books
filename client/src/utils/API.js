import axios from 'axios'

export default {
	// Gets just appointment times
	getBooks: function () {
		return axios.get('/api/appointments')
	},
	// Gets the appointment with the given id
	getBook: function (id) {
		return axios.get('/api/books/' + id)
	},
	// Deletes the appointment with the given id
	deleteBook: function (id) {
		return axios.delete('/api/books/' + id)
	},
	// Saves an appointment to the database
	saveBook: function (bookData) {
		return axios.post('/api/user', bookData)
	},
	// Get info on bookings
	getInfo: function () {
		return axios.get('/api/user')
	},
	signup: function (data) {
		return axios.post('/staff/signup', data)
	},
	stafflogin: function (data) {
		console.log('API stafflogin running...')
		return axios.post('/staff/login', data)
	},
}
