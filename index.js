var express = require('express'),
    mongoClient = require('mongodb').MongoClient,
    app = express(),
    range = require('node-range'),
    bodyParser = require('body-parser');

var URI = 'mongodb://localhost:27017/sample';

app.set('view engine', 'pug'); // Set templating engine
app.use(bodyParser.urlencoded()); // For parsing request body(urlencoded form values)

// Connect to the Mongo database
mongoClient.connect(URI, function(err, db){
  if(err){
    console.log(err.message);
    process.exit(1);
  }

  // Request handlers
  app.get('/', function(req, res){

    db.collection('movies').find({}).toArray(function(err, docs){
      if(err)
        res.send('Something went wrong');
      else
        res.render('index', { movies: docs });
    });

  });

  app.get('/new', function(req, res){

    // Pass years for form field options
    initialYear = 1913;
    currentYear = new Date().getFullYear();
    years = range(initialYear, currentYear + 1).toArray();

    res.render('new', { years: years });
  });


  app.post('/create', function(req, res){

    // console.log(req.body);
    var title = req.body.movie_name,
        year  = req.body.year,
        imdbId = req.body.imdb;

    db.collection('movies').insert({ title: title, year: year, imdb_id: imdbId }, function(err, result) {
      if(err)
        res.send("Couldn't create");
      else
        res.redirect('/');
    })
  });

  app.use(function(req, res){
    res.sendStatus(404);
  });


  var server = app.listen(8000);

});
