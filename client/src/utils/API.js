import axios from 'axios'

export default {
	// Gets all appointments
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
	// staff signup
	signup: function (signupData) {
		return axios.post('/api/signup', signupData)
	},
}
