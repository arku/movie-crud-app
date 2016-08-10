var express = require('express'),
    mongoClient = require('mongodb').MongoClient,
    app = express(),
    range = require('node-range');

app.set('view engine', 'pug'); // Set templating engine
// Request handlers

app.get('/', function(req, res){
  res.render('index');
});

app.get('/new', function(req, res){

  // Pass years for form field options
  initialYear = 1913;
  currentYear = new Date().getFullYear();
  years = range(initialYear, currentYear + 1).toArray();

  res.render('new', { years: years });
});

app.use(function(req, res){
  res.sendStatus(404);
});


var server = app.listen(8000);
