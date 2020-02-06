const express = require('express')
const comModel = require('../models/commentModel')

const router = express.Router()



router.param('it_id', function (req, res, next, itId) {
    console.log('TEST ...')
    req.itineraryId = itId;
    next()
  })

  router.get('/test/', (req,res) => {
    res.send({msg: 'comments test route'})
  })

  async function updateComment (data) {

    if (data.operation === 'DELETE') {
      await comModel.deleteOne({_id: data.id});
    } else {
      await comModel.updateOne({_id: data.id}, { message: data.message });
    }
  }


  router.route('/:it_id')
    .get( function(req, res, next) {
        // console.log("Comments mistery:", req.itineraryId);
        //console.log("Comments query:", req.query);

        let srchFilter = { itId: req.itineraryId };
        
        if (req.query.comment == undefined) {
          srchFilter.comType = 'COM';
          if (req.query.activity) {
            srchFilter.activityId = req.query.activity;
          }
        } else {
            srchFilter.comType = 'RES';
            srchFilter.comId = req.query.comment;
        }
        console.log('FILTER:', srchFilter);

        const query = comModel.find(srchFilter).sort({ createdAt: -1 });
        query.select('message createdAt userName userPic');

        query.exec((err, data) => {
            if (err) {
                console.log("Activity Put Error", err);
                res.status(400).send(err);
            } else {
              if (data == null || data.length === 0) {
                console.log('ACTIVITY GET Ok no data: ', data)
                res.send(data);
              } else {
                console.log('ACTIVITY GET Ok: ', data)
                res.send(data);
              }
            }
        })
    })
    .put(function(req, res, next) {
        if (req.body.operation === 'CREATE') {
          const newComment = new comModel({...req.body.init, itId: req.itineraryId});
          newComment.save( (err) => {
              if (err) {
                  // console.log("Activity Put Error", err);
                  res.status(400).send(err);
              }
              else {
                  // console.log('ACTIVITY Put Ok: ', newComment);
                  res.send(newComment)
              }
          })
        } else {
            try {
              console.log('ROUTE UPDATE:', req.body)
                updateComment(req.body).then(
                    result => {
                        console.log('update comment sucessfull', result);
                        res.send(req.body);
                    },
                    error => {
                        console.log('Update comment return error:', error);
                        res.status(400).send(error);
                    }
                );
            }
            catch (error) {
                console.log('Update comment error:', error);
                res.status(400).send(error);
            }
        }

    })
    .post(function(req, res, next) {
        const newComment = new comModel({...req.body, itId: req.itineraryId});
        newComment.save( (err) => {
            if (err) {
                // console.log("Activity Post Error", err);
                res.status(400).send(err);
            }
            else {
                // console.log('ACTIVITY POST Ok: ', newComment);
                res.send(newComment)
            }
        })
    })



    module.exports = router