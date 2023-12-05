const foodRequests = require("../Models/foodRequestSchema")
const wasteRequests = require("../Models/wasteRequestSchema")

// Create food requests
exports.createFoodRequest = async(req, res) => {
    const {userId, username, packs, preference, postedTime, postedDate, delivery, status, description, address, pincode, phone, email, accepted: {acceptedUserId, acceptedName, acceptedAddress, acceptedPhone, acceptedEmail}} = req.body
    if (userId === req.payload) {
        try {   
            const newFoodRequest = new foodRequests({
                userId,
                username,
                packs,
                preference,
                postedTime,
                postedDate,
                delivery,
                status,
                description,
                address,
                pincode,
                phone,
                email,
                accepted: {
                    
                }
            })
            await newFoodRequest.save()
            res.status(200).json(newFoodRequest)
        } catch (error) {
            res.status(401).json(error)
        }
    } else {
        res.status(401).json("Unauthorized login")
    }
}

// Create waste requests
exports.createWasteRequest = async(req, res) => {
    const {userId, username, quantity, type, postedTime, postedDate, delivery, status, description, address, pincode, phone, email, accepted: {acceptedUserId, acceptedName, acceptedAddress, acceptedPhone, acceptedEmail}} = req.body
    if (userId === req.payload) {
        try {
            const newWasteRequest = new wasteRequests({
                userId,
                username,
                quantity,
                type,
                postedTime,
                postedDate,
                delivery,
                status,
                description,
                address,
                pincode,
                phone,
                email,
                accepted: {
                }
            })
            await newWasteRequest.save()
            res.status(200).json(newWasteRequest)
        } catch (error) {
            res.status(401).json(error)
        }
    } else {
        res.status(401).json("Unauthorized login")
    }
}

// Get user requests (all requests)
exports.allUserRequests = async(req, res) => {
    const userId = req.payload
    try {
        const allFoodRequests = await foodRequests.find({userId})
        const allWasteRequest = await wasteRequests.find({userId})
        const allRequests = {
            allFoodRequests,
            allWasteRequest
        }
        res.status(200).json(allRequests)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Get requests based on PINCODE
exports.pincodeRequests = async(req, res) => {
    const pincode = req.body.pincode
    try {
        const allPincodeFoodRequests = await foodRequests.find({pincode})
        const allPincodeWasteRequests = await wasteRequests.find({pincode})
        const allPincodeRequests = {
            allPincodeFoodRequests,
            allPincodeWasteRequests
        }
        res.status(200).json(allPincodeRequests)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Get all accepted requests
exports.allUserAcceptedRequests = async(req, res) => {
    const userId = req.payload
    try {
        const allFoodAccepts = await foodRequests.find({'accepted.acceptedUserId':userId})
        const allWasteAccepts = await wasteRequests.find({'accepted.acceptedUserId':userId})
        allAcceptedRequests = {
            allFoodAccepts,
            allWasteAccepts
        }
        res.status(200).json(allAcceptedRequests)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// Get entire requests
exports.entireRequests = async(req, res) => {
    try {
        const allFoodRequests = await foodRequests.find()
        const allWasteRequests = await wasteRequests.find()
        const allRequests = {
            allFoodRequests,
            allWasteRequests
        }
        res.status(200).json(allRequests)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Accept request
exports.acceptRequest = async(req, res) => {
    const {id} = req.params
    const {acceptedAddress, acceptedEmail, acceptedName, acceptedPhone, acceptedUserId, acceptedTime, acceptedDate, reqType, status} = req.body
    if (reqType === 'food') {
        try {
            const updateFoodRequest = await foodRequests.findByIdAndUpdate({"_id":id}, {
                $set: {
                    accepted: {
                        acceptedUserId,
                        acceptedName,
                        acceptedAddress,
                        acceptedPhone,
                        acceptedEmail,
                        acceptedTime,
                        acceptedDate
                    },
                    status
                }
            }, {new: true})
            await updateFoodRequest.save()
            res.status(200).json(updateFoodRequest)
        } catch (error) {
            res.status(401).json(error)
        }
    } else {
        try {
            const updateWasteRequest = await wasteRequests.findByIdAndUpdate({"_id":id}, {
                $set: {
                    accepted: {
                        acceptedUserId,
                        acceptedName,
                        acceptedAddress,
                        acceptedPhone,
                        acceptedEmail,
                        acceptedTime,
                        acceptedDate
                    },
                    status
                }
            }, {new: true})
            await updateWasteRequest.save()
            res.status(200).json(updateWasteRequest)
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

// Update delivery status
exports.updateDeliveryStatus = async(req, res) => {
    const {id} = req.params
    const {status, type} = req.body
    console.log(id);
    console.log(status);
    console.log(type);
    if (type === 'food') {
        try {
            const updateReqStatus = await foodRequests.findByIdAndUpdate({"_id":id}, {
                $set: {
                    status
                }
            }, {new: true})
            await updateReqStatus.save()
            res.status(200).json(updateReqStatus)
        } catch (error) {
            res.status(401).json(error)
        }
    } else {
        try {
            const updateReqStatus = await wasteRequests.findByIdAndUpdate({"_id":id}, {
                $set: {
                    status
                }
            }, {new: true})
            await updateReqStatus.save(updateReqStatus)
            res.status(200).json(updateReqStatus)
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

// Edit created food request
exports.editCreatedFoodRequest = async(req, res) => {
    const {id} = req.params
    const {packs, delivery, description, preference} = req.body
    try {
        const updateFoodRequest = await foodRequests.findByIdAndUpdate({"_id":id}, {
            $set: {
                packs,
                preference,
                delivery,
                description
            }
        }, {new: true})
        await updateFoodRequest.save()
        res.status(200).json(updateFoodRequest)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Edit created waste request
exports.editCreatedWasteRequest = async(req, res) => {
    const {id} = req.params
    const {quantity, delivery, description, type} = req.body
    try {
        const updateRequest = await wasteRequests.findByIdAndUpdate({"_id":id}, {
            $set: {
                quantity,
                type,
                delivery,
                description
            }
        }, {new: true})
        await updateRequest.save()
        res.status(200).json(updateRequest)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Delete created food requests
exports.deleteFoodRequest = async(req, res) => {
    const {id} = req.params
    try {
        const deleteRequest = await foodRequests.findByIdAndDelete({"_id":id})
        res.status(200).json(deleteRequest)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Delete created waste request
exports.deleteWasteRequest = async(req, res) => {
    const {id} = req.params
    try {
        const deleteRequest = await wasteRequests.findByIdAndDelete({"_id":id})
        res.status(200).json(deleteRequest)
    } catch (error) {
        res.status(401).json(error)
    }
}

