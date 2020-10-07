const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   username: {type: String, required: true},
   score: {type: Number}
})

const User = mongoose.model('User', userSchema)

module.exports = User