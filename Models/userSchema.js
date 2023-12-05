const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: [3, "Must be at least 3, got {VALUE}"]
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validator(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    attribute: {
        type: String,
        required: true
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users