const express = require('express')

const userModel = require('../models/userModel')

const bcrypt = require('bcrypt')
const saltRounds = 10


const router = express.Router()

router.get('/test/', (req,res) => {
  res.send({msg: 'Users test route'})
})

router.get('/fetch', (req, res) => {

    let srchKey =  undefined;
    if (req.query.name != undefined && req.query.name !== 'all') {
        const refUser = new RegExp('^' + req.query.name + '$', 'gi')
        srchKey = {name: refUser}
    }

    if (req.query.email != undefined) {
        const refEmail = new RegExp('^' + req.query.email + '$', 'gi')
        srchKey = { email: refEmail }
    }    
    console.log('FILTER:', srchKey)

    let uQuery = userModel.find(srchKey);
    uQuery.select('name email img')

    uQuery.exec((err, data) => {
        if (err) {
            console.log("User Get Error", err);
            res.status(400).send(err);
        } else {
          if (data == null || data.length === 0) {
            // console.log('ACTIVITY GET Ok no data: ')
            res.status(404).send('No Users Found');
          } else {
            // console.log('User fetch is fine: ', data)
            res.send(data);
          }
        }
    })
})

router.get('/check-credentials', (req, res) => {

  let srchKey =  undefined;

  if (req.query.name != undefined && req.query.name !== 'all') {
      const refUser = new RegExp('^' + req.query.name + '$', 'gi')
      srchKey = {name: refUser}
  }

  if (req.query.email != undefined) {
      const refEmail = new RegExp('^' + req.query.email + '$', 'gi')
      srchKey = { email: refEmail }
  }    
  console.log('FILTER2:', srchKey)
  if (srchKey !== undefined || req.query.pass == undefined) {
      let uQuery = userModel.find(srchKey);
    uQuery.select('name email img password')

    uQuery.exec((err, data) => {
        if (err) {
            console.log("User Get Error", err);
            res.status(400).send(err);
        } else {
          if (data == null || data.length === 0) {
            // console.log('ACTIVITY GET Ok no data: ')
            res.status(404).send('User not found');
          } else {
            bcrypt.compare(req.query.password, data[0].password)
            .then(function(result) {
              // console.log('The pass  check:', result);
              if (result) {
                data[0].password = '';
                res.send(data[0]);
              } else {
                res.status(404).send('Password is incorrect');
              }
            }).catch(err => {
              // console.log('Bcrypt compare error', req.query.password, data)
              res.status(404).send('Password check failed');
            })
          }
        }
    })
  } else {
    console.log("No USer to filter");
    res.status(400).send('ID or password missing');
  }
})

router.post('/create', (req, res) => {
    const newUser = new userModel(req.body);
    //console.log("NEW USER:", newUser.password);
    const pass = req.body.password;
    //console.log("PASSWD:", pass);
    bcrypt.genSalt(saltRounds)
      .then(function(salt) {
        bcrypt.hash(pass, salt)
          .then(function(hash) {
            newUser.password = hash;
            newUser.save((err) => {
              if (err) {
                // console.log('CREATE ERROR', err.name);
                res.status(400).send(err);
              } else {
                  newUser.password = '';
                  res.send(newUser);
              }
            })
        }
      )
    });
   
})

module.exports = router