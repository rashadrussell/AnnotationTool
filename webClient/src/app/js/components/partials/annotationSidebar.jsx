var React = require('react'),
    CurrentFileAction = require('../../actions/CurrentFileAction.js');

var AnnotationSidebar = React.createClass({

  getInitialState: function() {
    return {
      annotationOptions: [],
      annotations: {}
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var intervals = Object.keys(nextProps.annotations),
        sortedAnnotations = {};

    intervals.sort(function(key1, key2) {
      var startEndFirst = key1.split(','),
          startEndSecond = key2.split(',');
      startEndFirst[1] = parseInt(startEndFirst[1], 10);
      startEndSecond[1] = parseInt(startEndSecond[1], 10);
      return startEndFirst[1] - startEndSecond[1];
    });
    intervals.forEach(function(interval) {
      sortedAnnotations[interval] = nextProps.annotations[interval];
    });
    this.pasteAnnotationOptions(sortedAnnotations);
    this.setState({annotations: sortedAnnotations});
  },

  remove: function(startEnd, e) {
    e.preventDefault();
    this.props.handleRemove(startEnd);
  },

  targetAnnotation: function(index, e) {
    e.preventDefault();    
    var chosenItem = $('.highlight:eq('+index+')');
    $('html, body').animate({
      scrollTop: chosenItem.offset().top
    }, 1000);
  },

  pointer: function(index, e) {
    var chosenItem = $('.highlight:eq('+index+')');
    $('.chosen-annotation').css({
      display: 'block',
      top: chosenItem.offset().top + 12,
      left: chosenItem.offset().left,
      position: 'absolute',
      zIndex: 9999 
    });
  },

  changeCategory: function(startEnd, e) {
    this.props.changeHandler(e.target.value, startEnd);
  },

  pasteAnnotationOptions: function(annotations) {
    var annotationOptions = [],
        keys = Object.keys(annotations);
    
    keys.sort(function(key1, key2) {
      var startEndFirst = key1.split(','),
          startEndSecond = key2.split(',');
      startEndFirst[1] = parseInt(startEndFirst[1], 10);
      startEndSecond[1] = parseInt(startEndSecond[1], 10);
      return startEndFirst[1] - startEndSecond[1];
    });

    if(annotations) {
      for(var i = 0; i<keys.length; i++) {
        annotationOptions.push(
          (
            <div key={i} onMouseEnter={this.pointer.bind(this, i)} className='annotation-selector'>
              <div className='col1'>
                <p>{annotations[keys[i]].annotation}</p>
                <select onChange={this.changeCategory.bind(this, keys[i])} data-defvalue={annotations[keys[i]].category} value={annotations[keys[i]].category}>
                  <option value='LOCATION'>Location</option>
                  <option value='ORGANIZATION'>Organization</option>
                  <option value='PERSON'>Person</option>
                </select>
              </div>
              <div className='col2'>
                <a href='#' className='jump' onClick={this.targetAnnotation.bind(this, i)}>Jump to</a>
              </div>
              <div className='col3'>
                <a href='#' className='remove-annotation' onClick={this.remove.bind(this, keys[i])}>
                  <i className='fa fa-trash'></i>
                </a>
              </div>
            </div>
          )
        );
      }
    }

    this.setState({annotationOptions: annotationOptions});
  },

  render: function() {
    var downloadContent = {text: this.props.rawText, annotations: this.state.annotations}; 
    return (
      <div id='annotation-sidebar'>
        <div className='download'>
          <a href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(downloadContent))
} download='annotations.json'>
            <div className='save-button' method="POST" action='/download'>
              <i className="fa fa-download"></i> Save Annotations
            </div>
            </a>
        </div>
        <div className='annotation-items'>
          {
            this.state.annotationOptions
          }
        </div>
      </div>
    );
  }
});

module.exports = AnnotationSidebar;