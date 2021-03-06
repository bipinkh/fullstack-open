const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// create schema
const personSchema = new mongoose.Schema({
  name: { type: String, required:true, minlength: 3 },
  number: { type: String, required:true, minlength: 8 }
})
// run validators during POST
personSchema.plugin(uniqueValidator)
// also run validators in PUT
personSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true
  next()
})

// set toJSON
personSchema.set( 'toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// create model and export
module.exports = mongoose.model('Person', personSchema)
