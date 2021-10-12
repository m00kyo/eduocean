var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    title: {type: String, required: true},
    desc: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    lang: {type: String, ref: 'Lang', required: true}
  }
);

// Virtual for book's URL
ArticleSchema
.virtual('url')
.get(function () {
  return '/article/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', ArticleSchema);
