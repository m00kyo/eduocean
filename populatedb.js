#! /usr/bin/env node
// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Article = require('./models/article')
var Genre = require('./models/genre')
var Lang = require('./models/lang')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var genres = []
var articles = []
var langs = []

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  });
}

function articleCreate(title, desc, genre, lang, link, cb) {
  articledetail = { 
    title: title,
    desc: desc,
    genre: genre,
    lang: lang,
    link: link,
  }
  if (genre != false) articledetail.genre = genre
    
  var article = new Article(articledetail);    
  article.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Article: ' + article);
    articles.push(article)
    cb(null, article)
  });
}


function langCreate(name, cb) {
  langdetail = { 
    name: name
  }

  var lang = new Lang(langdetail);    
  lang.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Lang: ' + lang);
      cb(err, null)
      return
    }
    console.log('New Lang: ' + lang);
    langs.push(name)
    cb(null, articles)
  });
}


function createGenre(cb) {
    async.series([
        function(callback) {
          genreCreate('Informatyka', callback);
        },
        function(callback) {
          genreCreate('Matematyka', callback);
        },
        function(callback) {
          genreCreate('Biologia', callback);
        },
        function(callback) {
          genreCreate('Biologia', callback);
        },
        function(callback) {
          genreCreate('Chemia', callback);
        },
        function(callback) {
          genreCreate('Rozwój Osobisty', callback);
        },
        function(callback) {
          genreCreate('Historia', callback);
        }
        ],
        // optional callback
        cb);
}

function createLang(cb) {
  async.parallel([
      function(callback) {
        langCreate('Polski', callback)
      },
      function(callback) {
        langCreate('Angielski', callback)
      },
      function(callback) {
        langCreate('Niemiecki', callback)
      },
      function(callback) {
        langCreate('Francuski', callback)
      }
      ],
      // Optional callback
      cb);
}

function createArticles(cb) {
    async.parallel([
        function(callback){
          articleCreate("Jak zostać fullstack developerem?", "Poradnik dla chętnych nauki nowych technologii i rozwiązań", [genres[0],], langs[0], "https://www.theodinproject.com/", cb);
        }
        ],
        // optional callback
        cb);
}


async.series([
    createGenre,
    createLang,
    createArticles
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Langs: '+ langs);   
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



