var express = require('express'),
    mongoClient = require('mongodb').MongoClient,
    app = express();

// Request handlers

app.get('/', function(req, res){
  res.send('Hey, there!');
});

app.use(function(req, res){
  res.sendStatus(404);
});


var server = app.listen(8000);
