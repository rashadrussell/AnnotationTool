var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    CONSTANTS     = require('../constants/ActionConstants.js'),
    assign        = require('object-assign'),
    _             = require('lodash');

var CHANGE_EVENT = 'change';

var _currentFile = {filename: '', text: '', annotations: {}};
var _allFiles = [];

function loadText(text, annotations) {
  _currentFile.text = text;
  _currentFile.annotations = annotations || {};
}

function setAllFiles(files) {
  _allFiles = files;
}

function setCurrentFilename(filename) {
  _currentFile.filename = filename;
}

function addAnnotation(annotation, startIndex, endIndex) {
  _currentFile.annotations[startIndex+','+endIndex] = {annotation: annotation, category: 'PERSON'};
}

function updateCategory(category, startEnd) {
  _currentFile.annotations[startEnd].category = category;
}

function removeHighlight(startEnd) {
  delete _currentFile.annotations[startEnd];
}

var CurrentFileStore = assign({}, EventEmitter.prototype, {

  getAllFiles: function() {
    return _allFiles;
  },

  getCurrentFile: function() {
    return _currentFile;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
CurrentFileStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case CONSTANTS.RECEIVE_ALL_FILES:
      setAllFiles(action.files);
      CurrentFileStore.emitChange();
      break;

    case CONSTANTS.GET_CURRENT_FILE:
      setCurrentFilename(action.filename);
      //CurrentFileStore.emitChange();
      break;

    case CONSTANTS.RECEIVE_FILE_CONTENT:
      loadText(action.text, action.annotations);
      CurrentFileStore.emitChange();
      break;

    case CONSTANTS.ADD_ANNOTATION:
      addAnnotation(action.annotation, action.startIndex, action.endIndex);
      CurrentFileStore.emitChange();
      break;
    
    case CONSTANTS.UPDATE_CATEGORY:
      updateCategory(action.category, action.startEnd);
      CurrentFileStore.emitChange();
      break;

    case CONSTANTS.REMOVE_HIGHLIGHT:
      removeHighlight(action.startEnd);
      CurrentFileStore.emitChange();
      break;

    default:
      // no operation
  }

});

module.exports = CurrentFileStore;