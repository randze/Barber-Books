const db = require("../models");
const { User } = require("../models");
const appointments = require("../models/appointments");

module.exports = function(app) {
    app.get("/api/user", async (req, res) => {
        const userList = await db.User.find({}).populate('users')
        
       res.json(userList)
    })
        
    app.get("/api/appointments", (req, res) => {
        db.Appointments.find({}, function (err, appointments){
            if(err){
                res.send("Something went wrong!");
                next();
            }
            res.json(appointment);
        });
    })

    app.post("/api/user", async (req, res) => {
        const data = req.body
        console.log( 'post data: ',data )
        await db.User.create( data )
        res.send({ status: true, message: "Successfully added appointment" })
    });

    app.post("/api/appointments", (req, res) => {
        Appointments.find()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).json(err))
    });

    app.post('/api/user/test', async function (req, res) {
        console.log(`[POST] /appointments, body:`, req.body)
        try {
            // first create a new user if not already exists
            let postingUser;
            let userMatch = await db.User.find({ email: req.body.email }).limit(1)
    
            if (userMatch.length == 0) {
                console.log(` .. user does not exist, creating them!`)
                // create the user
                postingUser = await db.User.create( {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                } )
                console.log(` ... added the user, id=${postingUser._id}`)
            } else {
                postingUser = UserMatch[0]
                console.log(` ! user already exists, using them, id=${postingUser._id}`)
            }
    
            console.log(`.. checking if user is unique:`, postingUser)
    
            // save the Appointments
            let postedAppointment = await db.Appointments.create({
                time: req.body.time
            })
            console.log(`.. * created Appointment: id=${postedAppointment._id}`)
    
            // save the Appointment-id to the user list
            console.log(` about to add Appointment to the users Appointment list:`)
    
            const updateResult = await db.User.updateOne({ name: req.body.name }, { $push: { appointments: postedAppointment._id } })
            console.log(` ... finished adding the Appointment to the user: `, updateResult)
            res.send({ status: true, message: "Successfully added Appointment" })
        } catch (err) {
            console.log(`x sorry invalid Appointment`, err)
            res.send({ status: false, message: `Sorry unable to create Appointment: ${err.message}` })
        }
    })
}
