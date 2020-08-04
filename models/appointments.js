const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    time: {
        type: Date,
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Appointments", AppointmentSchema);