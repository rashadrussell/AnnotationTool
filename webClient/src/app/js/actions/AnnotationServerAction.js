var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var CONSTANTS     = require('../constants/ActionConstants.js');

module.exports = {
  receiveAllFiles: function(fileList) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.RECEIVE_ALL_FILES,
      files: fileList,
    });
  },

  receiveFileContent: function(text, annotations) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.RECEIVE_FILE_CONTENT,
      text: text,
      annotations: annotations
    });
  }
};