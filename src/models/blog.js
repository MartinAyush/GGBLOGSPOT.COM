const mongoose = require('mongoose')
const moment = require('moment')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Buffer,
        required: true
    }
}, {
    timestamps: true
})

blogSchema.virtual('imagesrc').get(function () {
    return `${this.image.toString('base64')}`
})

blogSchema.virtual('time').get(function () {
    return moment(this.createdAt).format('MMMM D,YYYY || h:m a')
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog