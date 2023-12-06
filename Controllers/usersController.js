const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

// Logic for resolving register request
exports.register = async(req, res) => {
    // console.log("Inside register controller function");
    const{username, phone, email, password, address, city, district, state, pincode, attribute} = req.body
    try {
        const isUserExists = await users.findOne({email})
        if (isUserExists) {
            res.status(406).json("User already exists. Please login")
        } else {
            const newUser = new users({
                username,
                phone,
                email,
                password,
                address,
                city,
                district,
                state,
                pincode,
                attribute
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(`Register API failed. Error: ${error}`)
    }
}

// Logic for resolving login request
exports.login = async(req, res) => {
    const {email, password} = req.body
    try {
        const isUserExists = await users.findOne({email, password})
        if (isUserExists) {
            const token = jwt.sign({userId: isUserExists._id}, "SecretSuperKey123")
            res.status(200).json({
                isUserExists, token
            })
        } else {
            res.status(401).json('Email or password is incorrect')
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// Logic to resolve profile edit request
exports.editUserDetails = async(req, res) => {
    const {id, username, phone, email, address, city, district, state, pincode, attribute} = req.body
        try {
            const editUserDetails = await users.findByIdAndUpdate({"_id":id}, {
                $set : {
                    username,
                    phone,
                    email,
                    address,
                    city,
                    district,
                    state,
                    pincode,
                    attribute
                }
            }, {new: true})
            res.status(200).json(editUserDetails)
        } catch (error) {
            res.status(401).json(error)
        }
}

// Change password
exports.changePassword = async(req, res) => {
    const {id, password} = req.body
    console.log(id);
    console.log(password);
    try {
        const changePassword = await users.findByIdAndUpdate({"_id":id}, {
            $set: {
                password
            }
        }, {new: true})
        await changePassword.save()
        res.status(200).json(changePassword)
    } catch (error) {
        res.status(401).json(error)
    }
}