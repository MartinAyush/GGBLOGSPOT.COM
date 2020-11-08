if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const User = require('../models/User')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.pass, 8)
    const user = new User({
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        password: hashPass,
        phoneNumber: req.body.phoneno,
    })

    try {
        await user.save()
        await user.generateAuthToken()
        res.redirect('login')
    } catch (error) {
        console.log(error)
        res.redirect('signup')
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if (!user) {
            res.redirect('login')
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(req.body.pass, user.password)

        if (!isMatch) {
            res.redirect('login')
            throw new Error('Unable to login')
        }

        await user.generateAuthToken()
        const blogs = await Blog.find({})
        res.render('user', {
            name: user.firstName,
            blogs
        })

    } catch (e) {
        console.log('Error occured', e)
    }
})

module.exports = router
