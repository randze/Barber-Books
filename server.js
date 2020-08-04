const express = require("express")
const mongoose = require('mongoose')
const path = require("path")
const db = require('./models')

const PORT = process.env.PORT || 8080;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// mongoose connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/epascheduler',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })


// Send every request to the React app
// Define any API routes before this runs

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

// html serve index
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app post


// app listener
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});