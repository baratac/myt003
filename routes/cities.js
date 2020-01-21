const express = require('express')
const cityModel = require('../models/cityModel')
const myCityModel = require('../models/myCityModel')
const data = require('../cList.json')
const mData = require('../cList')

const router = express.Router()

router.get('/test/', (req,res) => {
  res.send({msg: 'Cities test route'})
})

/*get all cities*/
router.get('/all',
    (req, res) => {
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    }
);

router.get('/mall',
    (req, res) => {
        myCityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

    //this is how you implement a city route by specific city
    router.get('/name/:name',
	    (req, res) => {
  		    let cityRequested = req.params.name;
  		    cityModel.findOne({ name: cityRequested })
			    .then(city => {
				    res.send(city)
		    	})
			    .catch(err => console.log(err));
    });

    router.get('/id/:id',
	    (req, res) => {
  		    let cityRequested = req.params.id;
  		    cityModel.findOne({ _id: cityRequested })
			    .then(city => {
				    res.send(city)
		    	})
			    .catch(err => console.log(err));
    });

    router.get('/update',
    (req, res) => {
        cityModel.insertMany(data)
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

    router.get('/my-update',
    (req, res) => {
        myCityModel.insertMany(mData)
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


module.exports = router