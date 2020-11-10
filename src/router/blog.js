const express = require('express')
const router = new express.Router()
const Blog = require('../models/blog')
const User = require('../models/User')
const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000
    }
})


router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.render('index', {
        blogs
    })
})


router.get('/blogs/add', (req, res) => {
    res.render('addBlog')
})

router.post('/blogs/add', upload.single('image'), async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.file.buffer
    })

    try {
        await blog.save()
        // res.send('<h1>Blog is Sucessfully saved!</h1>')
        res.redirect('back')
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/blogs/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('fullblog', { blog })
})

router.get('/blogs/update/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('updateBlog', {
        blog
    })
})

router.post('/blogs/update/:id', upload.single('image'), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        blog.title = req.body.title
        blog.description = req.body.description
        blog.category = req.body.category
        blog.image = req.file.buffer

        await blog.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

router.post('/blog/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.redirect('back')
        // res.send('<h1>Blog is sucessfully deleted</h1>')
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router