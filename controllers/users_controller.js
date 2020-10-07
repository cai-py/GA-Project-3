const express = require('express')
const users = express.Router()
const User = require('../models/users_schema.js')
const usersSeed = require('../models/users_seed.js')

users.post('/new', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        User.find({}, (err, foundUser) => {
            res.json(req.body) 
        })
    })
})

users.get('/seed', (req,res) => {
    User.insertMany(usersSeed, (err, manyUsers) => {
        res.json(req.body)
    })
})

module.exports = users