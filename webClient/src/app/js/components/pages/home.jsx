var React = require('react'),
    Board   = require('../partials/board.jsx'),
    Sidebar = require('../partials/sidebar.jsx'),
    AnnotationSidebar = require('../partials/annotationSidebar.jsx'),
    CurrentFileStore = require('../../stores/CurrentFileStore.js'),
    CurrentFileAction = require('../../actions/CurrentFileAction.js'),
    AnnotationServerAction = require('../../actions/AnnotationServerAction.js');

var getCurrentFile = function() {
  return CurrentFileStore.getCurrentFile();
};

var getAllFiles = function() {
  return CurrentFileStore.getAllFiles();
}

var Home = React.createClass({

  getInitialState: function() {
    var currentFileInfo = getCurrentFile(),
        allFiles = getAllFiles();
    return {
      allFiles: allFiles,
      currentFile: currentFileInfo.filename,
      rawText: '',
      text: currentFileInfo.text,
      annotations: currentFileInfo.annotations
    };
  },

  componentDidMount: function() {
    CurrentFileStore.addChangeListener(this._onCurrentFileStoreChange);
    CurrentFileAction.getAllFiles();
  },

  handleFileSelect: function(filename) {
    CurrentFileAction.getCurrentFile(filename);
  },

  handleAddAnnotation: function(annotation, startIndex, endIndex) {
    CurrentFileAction.addAnnotation(annotation, startIndex, endIndex);
  },

  handleRemove: function(startEnd) {
    CurrentFileAction.removeHighlight(startEnd);
  },

  highlightAnnotations: function(text, currentFileData) {
    var intervals = Object.keys(currentFileData.annotations),
        startIncrement = 0,
        endIncrement = 0,
        oldInterval,
        updateIntervals = {},
        adjust = true;

    intervals.sort(function(key1, key2) {
      var startEndFirst = key1.split(','),
          startEndSecond = key2.split(',');
      startEndFirst[1] = parseInt(startEndFirst[1], 10);
      startEndSecond[1] = parseInt(startEndSecond[1], 10);
      return startEndFirst[1] - startEndSecond[1];
    });

    for(var i = 0; i < intervals.length; i++) {
      var startEnd = intervals[i].split(',');
      
      startEnd[0] = parseInt(startEnd[0], 10);
      startEnd[1] = parseInt(startEnd[1], 10);

      oldInterval = startEnd.join(',');
      updateIntervals[oldInterval] = null;

        startEnd[0] += startIncrement;
        startEnd[1] += endIncrement;
        startEnd[1] += 1;

      updateIntervals[oldInterval] = startEnd;

      var tmp = '';
      tmp = text.substr(0, startEnd[0]) + 
            '<span class="highlight">' + 
            text.substr(startEnd[0], startEnd[1]-startEnd[0]) +
            '</span>' +
            text.substr(startEnd[1], text.length-1);

      text = tmp;
      
      startIncrement += 31;
      endIncrement += 31;
    }

    return text;
  },

  categoryChangeHandler: function(category, startEnd) {
    CurrentFileAction.updateCategory(category, startEnd);
  },

  filenameHandler: function(filename) {
    CurrentFileAction.getCurrentFile(filename);
    this.setState({currentFile: filename});
  },

  uploadHandler: function(data) {
    AnnotationServerAction.receiveFileContent(data.text, data.annotations);
  },

  render: function() {
    return (
      <div id='home'>
        <Sidebar uploadHandler={this.uploadHandler} filenameHandler={this.filenameHandler} listOfFiles={this.state.allFiles} currentFile={this.state.currentFile} />
        <Board text={this.state.text} annotations={this.state.annotations} addAnnotationHandler={this.handleAddAnnotation} updateAnnotationIntervals={this.updateAnnotationIntervals}/>
        <AnnotationSidebar rawText={this.state.rawText} annotations={this.state.annotations} changeHandler={this.categoryChangeHandler} handleRemove={this.handleRemove} />
      </div>
    );
  },

  _onCurrentFileStoreChange: function() {
    var currentFile = getCurrentFile();
    var allFiles = getAllFiles();
    var rawText = currentFile.text;
    var text = this.highlightAnnotations(currentFile.text, currentFile);
    this.setState({allFiles: allFiles, currentFile: currentFile.filename, rawText: rawText, text: text, annotations: currentFile.annotations});
  },

});

module.exports = Home;