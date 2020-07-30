const express = require("express");
const mongoose = require('mongoose')
const path = require("path");
const app = express();

// express
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scheduler',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

// app listener
app.listen(PORT, function () {
    console.log(`Serving app on: http://localhost:${PORT}`)
})
  