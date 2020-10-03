const express = require('express')
const office = express.Router()



//======================
//  INDEX ROUTE
//======================

office.get('/', (req, res) => {
  Office.find({}, (err, foundQuestion) => {
    res.json(foundQuestion)
  })
})

//========================
// CREATE ROUTE
//========================

office.post('/', (req, res) => {
  Office.create(req.body, (err, createdQuestion) => {
    Office.find({}, (err, foundQuestion) => {
      res.json(foundQuestion)
    })
  })
})

//=========================
//  UPDATE ROUTE
//=========================

office.put('/:id', (req, res) => {
  Office.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedQuestion) => {
    if(err) {
      res.send(err)
    } else {
      Office.find({}, (err, foundQuestion) => {
        res.json(foundQuestion)
      })
    }
  })
})

//===========================
//  DELETE ROUTE
//===========================

office.delete('/:id', (req, res) => {
  Office.findByIdAndRemove(req.params.id, (err, deletedComment) => {
    Office.find({}, (err, foundQuestion) => {
      res.json(foundQuestion)
    })
  })
})


module.exports = office
