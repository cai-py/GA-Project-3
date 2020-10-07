const mongoose = require('mongoose')

const officeSchema = new mongoose.Schema({
    content: String,
    character: String,
})

const Office = mongoose.model('Office', officeSchema)

module.exports = Office;