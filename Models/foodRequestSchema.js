const mongoose = require('mongoose')

const foodRequestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    packs: {
        type: String,
        required: true
    },
    preference: {
        type: String,
        required: true
    },
    postedTime: {
        type: String,
        required: true
    },
    postedDate: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accepted: {
        acceptedUserId: {
            type: String,
            default: null
        },
        acceptedName: {
            type: String,
            default: null
        },
        acceptedAddress: {
            type: String,
            default: null
        },
        acceptedPhone: {
            type: String,
            default: null
        },
        acceptedEmail: {
            type: String,
            default: null
        },
        acceptedTime: {
            type: String,
            default: null
        },
        acceptedDate: {
            type: String,
            default: null
        }
    }
})

const foodRequests = mongoose.model("foodRequest", foodRequestSchema)
module.exports = foodRequests