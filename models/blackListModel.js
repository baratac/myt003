const mongoose = require('mongoose')

const blSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }
  },
  { 
    collection : 'ubBlackList'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('BlackList', blSchema)