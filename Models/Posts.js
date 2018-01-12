const
    Mongoose = require('mongoose')

PostSchema = new Mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    date: {type: Date, default: Date.now},
    type: {type: String, required: true},
    body: {type: Object}
})


var Post = Mongoose.model('Post', PostSchema)

module.exports = Post