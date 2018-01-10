const
    BlogPostCTRL = require('../Controllers/BlogPostController.js')
    express = require('express')
    BlogPostRouter = new express.Router()

BlogPostRouter.route('/')
    .get(BlogPostCTRL.index)
    .post(BlogPostCTRL.create)

module.exports = BlogPostRouter