const mongoose = require('mongoose')
const moment = require('moment')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true,
        // trim: true
    },
    description: {
        type: String,
        // required: true,
        // trim: true
    },
    category: {
        type: String,
        // required: true,
        // trim: true
    },
    image: {
        type: Buffer
    },
    time: {
        type: String
    }
}, {
    timestamps: true
})

blogSchema.virtual('imagesrc').get(function () {
    if (this.image) {
        return `${this.image.toString('base64')}`
    }
})

// blogSchema.virtual('date').get(function () {
//     const blog = this
//     if (blog.createdAt) {
//         return moment(blog.timestamps).format('MMMM D,YYYY || h:m a')
//     }
// })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog