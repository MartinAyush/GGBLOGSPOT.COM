const express = require('express')
const router = new express.Router()
const Blog = require('../models/blog')
const multer = require('multer')
const sharp = require('sharp')
const moment = require('moment')

const upload = multer({
    limits: {
        fileSize: 1000000
    }
})

router.get('/addblog', (req, res) => {
    res.render('addBlog')
})

router.post('/addblog', upload.single('image'), async (req, res) => {
    const times = new Date().getTime()
    const time = moment(times).format('MMMM D,YYYY || h:m a')
    const buffer = await sharp(req.file.buffer).png().toBuffer()

    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: buffer,
        time: time
    })

    try {
        await blog.save()
        res.send("saved Sucessfully")
    } catch (error) {
        res.send(error)
    }
})

router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.render('index', {
        blogs
    })
})

module.exports = router