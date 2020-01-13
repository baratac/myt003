const express = require('express')
const itineraryModel = require('../models/itineraryModel')
const data = require('../iList.json')

const router = express.Router()

router.get('/itest/', (req,res) => {
  res.send({msg: 'Itineraries test route'})
})

/*-- get all itineraries --*/

router.get('/:city_id',
    (req, res) => {
        console.log("ITIN City: ", req.params.city_id)
        itineraryModel.find({ cityId: req.params.city_id})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

/*
router.get('/it-all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

    router.get('/it-update',
    (req, res) => {
        itineraryModel.insertMany(data)
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

*/
module.exports = router