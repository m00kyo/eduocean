var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Genre = new Schema(
  {
    name: {type: String, required: true, min: 3, max: 100},
  }
);

// Virtual for book's URL
Genre
.virtual('url')
.get(function () {
  return '/article/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', Genre);
