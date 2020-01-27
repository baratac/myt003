const blackList = require('../models/blackListModel')

module.exports = function checkToken(req, res, next) {
  //console.log('Check Token:', req, res, next)
  if (req == undefined) {
    return;
  }
  if (req.token == undefined || req.token == null) {
    next();
  }
  else {
    try {
        blackList.findOne({ token: req.token }).then(
        record => {
          if (record) {
            console.log('Black Listed token found');
            res.status(401).send('');
          }
          else {
            console.log('The token is cleared')
            next()
          } 
        },
        error => {
          console.log('DB Error:', error);
          next();
        }
      )
    }
    catch (error) {
      console.log('Check Token error', error);
      next();
    }
  }
}