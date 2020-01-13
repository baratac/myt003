const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },
    itId: {
        type: String,
        required: true
    },
  },
  { 
    collection : 'ubActivities'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('ubActivities', activitySchema)