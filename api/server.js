// Load Packages
var express = require('express'),
    app     = express(),
    fs      = require('fs'),
    path    = require('path'),
    util    = require('util'),
    xml2js  = require('xml2js'),
    bodyParser = require('body-parser');

// Server Port
var port = 3300;

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

function processAnnotations(chapter, filename, res) {
  var parser = new xml2js.Parser(),
      processedXML = {},
      cleanXML = [],
      xmlfile,
      content;

  fs.readFile(path.join('./data/annotations', filename+'.xml'), function(err, data) {
    if(err) res.status(500).json({"message": '500 Server Error'});

    parser.parseString(data, function(err, result) {
      if(err) res.status(500).json({"message": '500 Server Error'});

      result['document']['span'].forEach(function(annotationData) {
        var annotationBlock,
            category,
            annotation,
            start,
            end;

        category = annotationData['$']['category'];
        annotationBlock = annotationData['extent'][0]['charseq'][0];
        start = annotationBlock['$']['START'];
        end = annotationBlock['$']['END'];
        annotation = annotationBlock['_'];

        processedXML[start+','+end] = {'category': category, 'annotation': annotation};
        cleanXML.push(processedXML);
      });

      res.status(200).json({text:chapter.toString(), annotations: JSON.stringify(processedXML)});
    });

  });
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  next();
});

app.post('/getallfiles', function(req, res, next) {
  fs.readdir('./data/chapters', function(err, files) {
    res.status(200).json({files: files.filter(function(file) {
      return file.slice(-4) === '.txt';
    })});
  });
});

app.post('/loadfile', function(req, res, next) {
  var filename = req.body.filename;
  fs.readFile(path.join('./data/chapters', filename), function(err, data) {
    if(err) {
      if(err) res.status(500).json({"message": '500 Server Error'});
    }
    
    processAnnotations(data, filename, res);
  });
});

module.exports = app.listen(port, function() {
  console.log('Server listening at host: %s', port);
});