const express = require('express')
const comment = express.Router()
const Comment = require("../models/comments_schema")


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

comment.post('/', (req, res) => {
    Comment.create(req.body, (err, createdComment) => {
        Comment.find({}, (err, foundComment) => {
            res.json(foundComment)
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


module.exports = comment