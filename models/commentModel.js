const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comType: {
        type: String,
        required: true,
        default: 'COM'
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    usrId: {
        type: String
    },
    itId: {
        type: String,
        required: true
    },
    activityId: {
        type: String,
    },
    comId: { // Only required when comType = RES
        type: String, 
    }
  },
  { 
    collection : 'ubComs'
  }
)

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('ubComs', commentSchema)