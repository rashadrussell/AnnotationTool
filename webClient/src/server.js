var express = require('express'),
    app     = express(),
    path    = require('path'),
    config  = require('./config.js'),
    request = require('request'),
    bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'app')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/getallfiles', function(req, res, next) {
  var options = {
    url: 'http://104.236.79.53:3300/getallfiles',
    method: "POST"
  };
  request(options, function(err, response) {
    if (err) throw err;
    if (response) {
      res.status(200).json({files: response.body});
    }
  });
});

app.post('/loadfile', function(req, res, next) {
  var options = {
    url: 'http://104.236.79.53:3300/loadfile',
    method: "POST",
    json: {
      "filename": req.body.filename
    }
  };
  request(options, function(err, response) {
    if (err) throw err;
    if (response) {
      res.status(200).json(JSON.stringify({text: response.body.text, annotations: response.body.annotations}));
    }
  });
});

app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.listen(config.port, function() {
  console.log('Server listening at host: %s', config.host);
});