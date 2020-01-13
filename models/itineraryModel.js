const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    cityId: {
      type: String,
      required: true
    },
    rating: {
        type: Number,
    },
    duration: {
        type: String
    },
    price: {
        type: Number
    },
    hashTags: [String]
  },
  { 
    collection : 'ubItineraries'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('ubItineraries', itinerarySchema)