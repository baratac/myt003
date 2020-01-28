const express = require('express')
const passport = require('passport')
const itineraryModel = require('../models/itineraryModel')


const router = express.Router()
const checkToken = require('../midleware/verifyToken')

router.get('/itest/', (req,res) => {
  res.send({msg: 'Itineraries test route'})
})

/*-- get all itineraries --*/

router.get('/:city_id',checkToken, passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log("ITIN City: ", req.params.city_id)
        itineraryModel.find({ cityId: req.params.city_id})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


router.put('/likes',checkToken, passport.authenticate("jwt", { session: false }),
    (req,res ) => {
        itineraryModel.update({_id: req.body.id}, {rating: req.body.likes}).then(
            result => {
                console.log('UPDATE Itinerary', result);
                res.send(result);
            },
            err => {
                console.log('Update Itinerary error', err);
                res.status(400).send(err);
            }
        )
    }
);
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