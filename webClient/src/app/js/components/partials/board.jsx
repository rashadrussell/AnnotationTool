var React = require('react'),
    CurrentFileStore = require('../../stores/CurrentFileStore.js');

var getCurrentFile = function() {
  return CurrentFileStore.getCurrentFile();
};

var Board = React.createClass({

  addAnnotation: function(e) {
    var board = $('#content'),
        text  = board.text(),
        selectionObj,
        selectedText = '',
        anchorData,
        rootIndex = 0,
        startIndex = 0,
        endIndex = 0;

    selectionObj = window.getSelection();
    selectedText = selectionObj.toString();
    if(!selectedText.trim()) return;
    anchorData = window.getSelection().anchorNode.data;
    rootIndex = text.indexOf(anchorData);
    startIndex = rootIndex + selectionObj.anchorOffset;
    endIndex   = rootIndex + selectionObj.extentOffset-1;
    this.props.addAnnotationHandler(selectedText, startIndex, endIndex);
  },
  
  render: function() {
    return (
      <div id='board'>
        <pre id='content' onMouseUp={this.addAnnotation} dangerouslySetInnerHTML={{__html: this.props.text}}>
        </pre>
        <span className="chosen-annotation">
          <i className="fa fa-arrow-up"></i>
        </span>
      </div>
    );
  },

  _onCurrentFileStoreChange: function() {
    this.setState(getCurrentFile());
  }
  
});

module.exports = Board;