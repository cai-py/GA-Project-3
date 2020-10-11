const express = require('express')
const users = express.Router()
const User = require('../models/users_schema.js')
const usersSeed = require('../models/users_seed.js')

users.get('/', (req, res) => {
    User.find({}, (err, foundUser) => {
        res.json(foundUser)
    })
})

users.post('/new', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        User.find({}, (err, foundUser) => {
            res.json(foundUser) 
        })
    })
})

users.get('/seed', (req,res) => {
    User.insertMany(usersSeed, (err, manyUsers) => {
        res.json(manyUsers)
    })
})

module.exports = users