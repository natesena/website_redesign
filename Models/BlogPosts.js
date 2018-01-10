const
    Mongoose = require('mongoose')

BlogPostSchema = new Mongoose.Schema({
    title: {type: String},
    description: {type: String}
})

var BlogPost = Mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost