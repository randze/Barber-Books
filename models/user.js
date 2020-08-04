const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new schema ({
    userList : [
        {
            name: {
                type: String,
                trim: true,
                required: "Please enter your full name"
            },
            email: {
                type: String,
                trim: true,
                required: "Please enter your email"
            },
            Phone: {
                type: Number,
                required: "Please enter your phone number"
            },
        }
    ],
    appointments : [
        {
            day
        }
    ]
});