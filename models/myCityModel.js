const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    img: {
        type: String,
    },
    like: {
        type: Boolean,
        default: false,
        required: true
    }
  },
  { 
    collection : 'myCities'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('MyCityList', citySchema)