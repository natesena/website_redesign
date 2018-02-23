const Mongoose = require('mongoose')

userSchema = new Mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

var User = new Mongoose.model("User", userSchema)

module.exports = User