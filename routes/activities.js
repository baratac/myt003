const express = require('express')
const actvtModel = require('../models/acivityModel')

const router = express.Router()

router.get('/test/', (req,res) => {
  res.send({msg: 'Activities test route'})
})

router.param('it_id', function (req, res, next, itId) {
    req.itineraryId = itId;
    next()
  })

  router.route('/:it_id')
    .get( function(req, res, next) {
        const query = actvtModel.find({ itId: req.itineraryId });
        query.select('name img');

        query.exec((err, activity) => {
            if (err) {
                // console.log("Activity Put Error", err);
                res.status(400).send(err);
            } else {
              if (activity == null) {
                // console.log('ACTIVITY GET Ok no data: ')
                res.status(404).send('No Data Found');
              } else {
                console.log('ACTIVITY GET Ok: ', activity)
                res.send(activity);
              }
            }
        })
    })
    .put(function(req, res, next) {
        const newActivity = new actvtModel({...req.body, itId: req.itineraryId});
        newActivity.save( (err) => {
            if (err) {
                // console.log("Activity Put Error", err);
                res.status(400).send(err);
            }
            else {
                // console.log('ACTIVITY Put Ok: ', newActivity);
                res.send(newActivity)
            }
        })
    })
    .post(function(req, res, next) {
        const newActivity = new actvtModel({...req.body, itId: req.itineraryId});
        newActivity.save( (err) => {
            if (err) {
                // console.log("Activity Post Error", err);
                res.status(400).send(err);
            }
            else {
                // console.log('ACTIVITY POST Ok: ', newActivity);
                res.send(newActivity)
            }
        })
    })

    module.exports = router