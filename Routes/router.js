const express = require('express')
const router = new express.Router()
const usersController = require('../Controllers/usersController')
const requestController = require('../Controllers/requestController')
const otpController = require('../Controllers/otpController')
const jwtMiddleWare = require('../Middlewares/jwtMiddleware')

// User registration API
router.post('/users/register', usersController.register)

// User login request
router.post('/users/login', usersController.login)

// Food request creation
router.post('/request/food', jwtMiddleWare, requestController.createFoodRequest)

// Waste request creation
router.post("/request/waste", jwtMiddleWare, requestController.createWasteRequest)

// Get all user requests
router.get('/request/all', jwtMiddleWare, requestController.allUserRequests)

// Get requests based on PINCODE
router.post('/requests/pincode/all', jwtMiddleWare, requestController.pincodeRequests)

// Get user accepted requests
router.get('/accepted/all', jwtMiddleWare, requestController.allUserAcceptedRequests)

// Get entire requests (Active only)
router.get('/requests/active/all', requestController.entireRequests)

// Accept requests
router.patch('/requests/accept/:id', jwtMiddleWare, requestController.acceptRequest)

// Update status
router.patch('/requests/status/:id', jwtMiddleWare, requestController.updateDeliveryStatus)

// Update food request
router.patch('/requests/food/edit/:id', jwtMiddleWare, requestController.editCreatedFoodRequest)

// Update waste request
router.patch('/requests/waste/edit/:id', jwtMiddleWare, requestController.editCreatedWasteRequest)

// Delete food request
router.delete('/requests/food/delete/:id', jwtMiddleWare, requestController.deleteFoodRequest)

// Delete waste request
router.delete('/requests/waste/delete/:id', jwtMiddleWare, requestController.deleteWasteRequest)

// Edit user details
router.patch('/user/edit/', jwtMiddleWare, usersController.editUserDetails)

// Change password
router.patch('/user/change/password/', jwtMiddleWare, usersController.changePassword)

// OTP service
router.post('/user/password/change/', jwtMiddleWare, otpController.otpGenerator)

module.exports = router