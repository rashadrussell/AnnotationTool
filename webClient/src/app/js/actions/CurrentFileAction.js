var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AnnotationDataService = require('../services/AnnotationDataService.js'),
    CONSTANTS     = require('../constants/ActionConstants.js');

module.exports = {
  getAllFiles: function() {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.GET_ALL_FILES,
    });
    AnnotationDataService.getAllFiles();
  },

  getCurrentFile: function(filename) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.GET_CURRENT_FILE,
      filename: filename
    });
    AnnotationDataService.getCurrentFile(filename);
  },
  
  updateCategory: function(category, startEnd) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.UPDATE_CATEGORY,
      category: category,
      startEnd: startEnd
    });
  },

  addAnnotation: function(annotation, startIndex, endIndex) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.ADD_ANNOTATION,
      annotation: annotation,
      startIndex: startIndex,
      endIndex: endIndex
    });
  },
  
  removeHighlight: function(startEnd) {
    AppDispatcher.dispatch({
      actionType: CONSTANTS.REMOVE_HIGHLIGHT,
      startEnd: startEnd
    });
  }

};