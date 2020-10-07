const express = require('express')
const comment = express.Router()
const Comment = require("../models/comments_schema.js")
const commentsSeed = require('../models/comments_seed.js')


//===========================
//  SEED ROUTE
//===========================

comment.get('/seed', (req,res) => {
    Comment.insertMany(commentsSeed, (err, manyComments) => {
        res.json(req.body)
    })
})

//======================
//  INDEX ROUTE
//======================

comment.get('/', (req, res) => {
    Comment.find({}, (err, foundComment) => {
        res.json(foundComment)
    })
})


//========================
// CREATE ROUTE
//========================

comment.post('/new', (req, res) => {
    Comment.create(req.body, (err, createdComment) => {
        Comment.find({}, (err, foundComment) => {
            res.json(req.body) 
        })
    })
})

//=========================
//  UPDATE ROUTE
//=========================

comment.put('/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, updatedComment) => {
        if (err) {
            res.send(err)
        } else {
            Comment.find({}, (err, foundComment) => {
                res.json(foundComment)
            })
        }
    })
})

//===========================
//  DELETE ROUTE
//===========================

comment.delete('/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        Comment.find({}, (err, foundComment) => {
            res.json(foundComment)
        })
    })
})


// EXPORTS
module.exports = comment