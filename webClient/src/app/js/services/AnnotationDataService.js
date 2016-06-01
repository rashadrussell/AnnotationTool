var AnnotationServerAction = require('../actions/AnnotationServerAction.js');

module.exports = {
  getAllFiles: function() {
    var params = {};
    $.ajax({
      url: '/getallfiles',
      type: 'POST',
      dataType: 'json',
      data: params
    }).done(function(data) {
      var list = JSON.parse(data.files);
      AnnotationServerAction.receiveAllFiles(list.files);
    });
  },

  getCurrentFile: function(filename) {
    var params = {
      "filename": filename
    };
    $.ajax({
      url: '/loadfile',
      type: 'POST',
      dataType: 'json',
      data: params
    }).done(function(content) {
      var proccesed = JSON.parse(content);
      AnnotationServerAction.receiveFileContent(proccesed.text, JSON.parse(proccesed.annotations));
    });
  },

  getAnnotations: function(filename) {
    var params = {
      "filename": filename
    };
    $.ajax({
      url: '/loadannotations',
      type: 'POST',
      dataType: 'json',
      data: params
    }).done(function(annotations) {
      AnnotationServerAction.receiveAnnotations(JSON.parse(annotations));
    });
  },

  download: function(annotations) {
    var params = {
      "annotations": JSON.stringify(annotations)
    };
    $.ajax({
      url: '/download',
      type: 'get',
      dataType: 'json',
      data: params
    }).done(function(success) {
    });
  }
};