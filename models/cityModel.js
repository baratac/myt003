const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    img: {
        type: String,
    }
  },
  { 
    collection : 'ubCities'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('MyCity', citySchema)