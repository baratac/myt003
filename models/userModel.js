const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
  },
  { 
    collection : 'ubUsers'
  }
)

userSchema.plugin(uniqueValidator);

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('ubUsers', userSchema)