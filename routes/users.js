const express = require('express')
const passport = require('passport')
const userModel = require('../models/userModel')
const blackList = require('../models/blackListModel')
const bcrypt = require('bcrypt')

const key = require('../keys')
const jwt = require('jsonwebtoken')
const jwts = require('jwt-simple')


const router = express.Router()

const checkToken = require('../midleware/verifyToken')


router.get('/test/', (req,res) => {
  res.send({msg: 'Users test route'})
})

router.get('/test2', 
    passport.authenticate("jwt", { session: false }), 
    (req,res) => {
      console.log('req', req.user);
      res.json(req.user);
    }
);

router.get('/test3', (req,res) => {
      console.log('req token:', req.token);
      console.log('the key', key.googleAuth.key);
      
      try {
        const decoded = jwts.decode(req.token, key.secretOrKey);
          console.log(decoded) 
        }
        catch(err) {
          console.log("Decode Error RS256:", err);
          
        }
      res.send('TEST JSON REQUEST');
    }
);
// Goggle Authentication 
//
router.get('/authGoogle',
    passport.authenticate('google', { scope: ['profile'], session: false })
);

router.get('/authGoogle/redirect', passport.authenticate('google', { session: false }), (req, res) => {
      console.log('Google Reply Query', req.user);
      res.send(req.user);
  });


//
// FETCH AGENTS (all or by name/email case insensitive)
//
router.get('/get-user', checkToken,
    passport.authenticate("jwt", { session: false }), 
    (req,res) => {
      console.log('REQ User response', req.user);
      res.json({name: req.user.name, email: req.user.email, img: req.user.img});
    }
);

router.put('/logout',passport.authenticate("jwt", { session: false }), 
  (req,res) => {
    //console.log('Token to black list:', req.token)
    const blItem = new blackList( { token: req.token });
      blItem.save().then(
        token => {
         console.log('Token inserted', token);
         res.send('Token deleted');
        },
        error => { 
          console.log('Insert Token error', error);
          res.status(400).send('Logout failed');
        }
      )
  }
);
//
//
//
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
//
// SIMPLE LOGIN WITH NO JWT
//
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
  if (srchKey !== undefined) {
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
//
// LOGIN WITH Passport JWT USING POST, passing parameters on the body
//

const getToken = (refData) => {
  return new Promise ((resolve, reject) => {
    const payload = {
      id: refData._id,
      name: refData.name, 
      email: refData.email, 
      img: refData.img
    };
    const options = {expiresIn: 2592000};
    jwt.sign(payload, key.secretOrKey, options, (error, token) => {
      if (error) {
        console.log('JWT ERROR', error);
        reject(error)
      } else {
        console.log('SIGN OK');
        resolve(token);
      }
    })
  })
}
//
//  Check credentials for google login
//

async function getUser(userData) {

    
  let user = await userModel.findOneAndUpdate(
                      { 
                        $and: [ { googleId: {$exists: true} }, 
                              { googleId: userData.googleId }] 
                      },
                      userData
               );
  console.log("USER:", user);
  if (!user) {
    user = await new userModel(userData).save();
    if (user) {
      console.log('Google New user, update DB Ok', user);
    }
  } else {
    console.log('Google user found:', user);
  } 
  return user;
}

router.post('/login-google', (req, res) => {
   
  try  {
      getUser(req.body)
      .then(
        user => {
          getToken(user)
          .then(
            token => res.json({success: true, token: token}),
            error => {
              console.log('GET Token Error', error);
              res.status(404).send('User Token Error');
            }
          )
        },
        error => {
          console.log('Google User Handle Error', {message: error.message, type: error.name});
          res.status(400).send({message: error.message, type: error.name});
        }
      )
    }
    catch(err) {
        console.log('Router Post Error', err);
        res.status(400).send(err);
    }
  }
); 
//
//  Check credentials for manual login
//
const getUserFilter = (userData) => {

  if (userData.name != undefined && userData.name !== 'all') {
    const refUser = new RegExp('^' + userData.name + '$', 'gi')
    return { name: refUser };
  }

  if (userData.email != undefined) {
    const refEmail = new RegExp('^' + userData.email + '$', 'gi')
      return { email: refEmail };
  }  
  return null;
}

router.post('/check-credentials', (req, res) => {

  let srchKey =  getUserFilter(req.body);
  let userData = req.body;

  if ( srchKey == null ) {
    console.log("No USer to filter");
    res.status(400).send('ID or password missing');
  } else {
      console.log('FILTER2:', srchKey);
      const uQuery = userModel.find(srchKey);
      uQuery.select('name email img password');
      uQuery.exec((err, data) => {
        if (err) {
            console.log("User Get Error", err);
            res.status(400).send(err);
        } else {
          console.log('User Data:', data);
          if (data.length === 0) {
            res.status(404).send('User not found');
          } else {
            const refData = data[0];
            bcrypt.compare(userData.password, refData.password)
            .then(function(result) {
              // console.log('The pass  check:', result);
              if (result) {
                getToken(refData)
                  .then(
                    token => res.json({success: true, token: token}),
                    error => {
                      console.log('GET Token Error', error);
                      res.status(404).send('User Token Error');
                    }
                  )
                  .catch ((err) => {
                    console.log('Get Token catch error', err);
                  })
              } else {
                res.status(404).send('Password is incorrect');
              }
            }).catch(err => {
              console.log('Bcrypt compare error', userData.password, refData.password, err)
              res.status(404).send('Password check failed');
            })
          }
        }
      }
  )}
})

// 
// CREATE ACCOUNT WITH POST encrypting password with bcrypt
//

const saltRounds = 10
let createErrorMessage = {};

async function createUser(userData) {

  const pass = userData.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  const newUser = new userModel({ ...userData, password: hash });
  const user = await newUser.save();
  if (user) {
      console.log('DB Create new User ok', user);
  }
  return user;
}



router.post('/create', (req, res) => {

  try  {
    createUser(req.body)
    .then(
      newUser => {
        getToken(newUser)
        .then(
          token => res.json({success: true, token: token}),
          error => {
            console.log('GET Token Error', error);
            res.status(404).send('User Token Error');
          }
        )
      },
      error => {
        console.log('Create User Handle Error', {message: error.message, type: error.name});
        res.status(400).send({message: error.message, type: error.name});
      }
    )
  }
  catch(err) {
      console.log('Router Post Error', err);
      res.status(400).send(err);
  }
})

module.exports = router