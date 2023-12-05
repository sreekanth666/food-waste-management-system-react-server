const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(() => {
    console.log("Mongoose connected with MongoDB Atlas Server");
}).catch((err) => {
    console.log("MongoDB Connection is failed");
    console.log(err);
})