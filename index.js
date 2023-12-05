require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

// Creating express server
const smileServer = express()

// Using cors for data transfer between applications at different ports
smileServer.use(cors())
// Converting JSON into server understandable format
smileServer.use(express.json())
// Use router module
smileServer.use(router)

// Setting up PORT for server
const PORT = 4000 || process.env.PORT
smileServer.listen(PORT, () => {
    console.log("Server is up and listening");
})

// Configuring GET request
smileServer.get('/', (req, res) => {
    res.send("GET request")
})