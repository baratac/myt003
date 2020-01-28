const mongoose = require('mongoose')

const favoritesSchema = new mongoose.Schema(
  {
    id: {type: mongoose.Schema.ObjectId, select: false},
    __v: {type: Number, select: false},
    userId: {
      type: String,
      required: true
    },
    itineraryId: {
        type: String,
        required: true
      }
  },
  { 
    collection : 'ubFavorites'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('ubFavorites', favoritesSchema)