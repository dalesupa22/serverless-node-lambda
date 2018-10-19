const mongoose = require('mongoose');
const constants = require('../functions/Contants');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  collection: constants.COLLECTIONS_ID+'housecollection'
};


var tripSchema = new mongoose.Schema({
  updatedAt: Date,
  createdAt: Date,
  active: Boolean,
  name : String
}, schemaOptions);

module.exports = mongoose.models.House||mongoose.model('House', tripSchema);