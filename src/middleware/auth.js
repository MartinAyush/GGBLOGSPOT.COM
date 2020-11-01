const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()

    } catch (error) {
        res.send('Please Authenticate')
    }
}

module.exports = auth