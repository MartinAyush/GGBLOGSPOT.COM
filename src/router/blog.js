const express = require('express')
const router = new express.Router()
const Blog = require('../models/blog')
const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000
    }
})

router.get('/addblog', (req, res) => {
    res.render('addBlog')
})

router.post('/addblog', upload.single('image'), async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.file.buffer
    })

    try {
        await blog.save()
        res.send('<h1>Blog is Sucessfully saved!</h1>')
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.render('index', {
        blogs
    })
})
router.get('/showblog', async (req, res) => {
    const blogs = await Blog.find({})
    res.render('index', {
        blogs
    })
})

router.get('/updateblog', (req, res) => {
    res.render('updateBlog')
})

module.exports = router