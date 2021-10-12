var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Lang = new Schema(
  {
    name: {type: String, required: true, min: 3, max: 40},
  }
);

// Virtual for book's URL
Lang
.virtual('url')
.get(function () {
  return '/article/' + this._id;
});

//Export model
module.exports = mongoose.model('Lang', Lang);