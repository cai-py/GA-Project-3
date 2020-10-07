const express = require('express')
const comments = express.Router()
const Comment = require("../models/comments_schema")


//======================
//  INDEX ROUTE
//======================

comments.get('/comments', (req, res) => {
    Comment.find({}, (err, foundComment) => {
        res.json(foundComment)
    })
})


//========================
// CREATE ROUTE
//========================

comments.post('/:id', (req, res) => {
    Comment.create(req.body, (err, createdComment) => {
        Comment.find({}, (err, foundComment) => {
            res.json(foundComment)
        })
    })
})

//=========================
//  UPDATE ROUTE
//=========================

comments.put('/:id', (req, res) => {
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

comments.delete('/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        Comment.find({}, (err, foundComment) => {
            res.json(foundComment)
        })
    })
})


module.exports = comments