var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dataSource = 'emulate/guesses.json';

app.set('port', (process.env.PORT || 1337));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

var guesses;
app.get('/guesses', function(req, res) {
  if(guesses){
    res.setHeader('Content-Type', 'application/json');
    res.send(guesses);
    return;
  }

  fs.readFile(dataSource, function(err, data) {
    guesses = JSON.parse(data);    
    res.setHeader('Content-Type', 'application/json');
    res.send(guesses);
  });
});

app.post('/guess', function(req, res) {  
  guesses.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(JSON.stringify(guesses));
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
