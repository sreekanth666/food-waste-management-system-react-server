const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1]
    try {
        const jwtResponse = jwt.verify(token, "SecretSuperKey123")
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(401).json("Authorization failed. Please login")
    }
}

module.exports = jwtMiddleWare