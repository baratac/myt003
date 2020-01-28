const express = require('express')
const passport = require('passport')
const favorites = require('../models/favoritesModel')

const router = express.Router()
const checkToken = require('../midleware/verifyToken')

async function updateFavorites( user_id, data ) {

    const elem = { userId: user_id, itineraryId: data.itineraryId };
    
    if (data.like === false) {
       return  await favorites.deleteOne( elem );
    } else {
        return await new favorites( elem ).save();
    }
}

router.get('/test/', (req,res) => {
  res.send({msg: 'Favorites test route'})
})
/*
router.param('user_id', function (req, res, next, userId) {
    req.user_id = userId;
    next()
  })
*/
router.get('/', checkToken, passport.authenticate("jwt", { session: false }), function(req, res) {
        // console.log('Favorites show request', req.user)
        const query = favorites.find({ userId: req.user.id });
        query.select('itineraryId');

        query.exec((err, favorites) => {
            if (err) {
                console.log("Favorites Get Error", err);
                res.status(400).send(err);
            } else {
              console.log('Favories list:', favorites);
              res.send(favorites);
            }
        })
    });

router.put('/', checkToken, passport.authenticate("jwt", { session: false }),function(req, res) {       
        try {
            updateFavorites(req.user.id, req.body).then(
                result => {
                    //console.log('update favorites sucessfull', result);
                    res.send(result);
                },
                error => {
                    console.log('Update favorites return error:', error);
                    res.status(400).send(error);
                }
            );
        }
        catch (error) {
            console.log('Update favorites error:', error);
            res.status(400).send(error);
        }
    });

    module.exports = router