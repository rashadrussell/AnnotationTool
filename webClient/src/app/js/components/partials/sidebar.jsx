var React = require('react');

var Sidebar = React.createClass({
  setCurrentFile: function(filename) {
    this.props.filenameHandler(filename);
  },

  handleUpload: function(e) {
    var reader = new FileReader();
    reader.onload = function() {
      var data = reader.result;
      this.props.uploadHandler(JSON.parse(data));
    }.bind(this);

    reader.readAsText(e.target.files[0]);

  },

  render: function() {
    return (
      <div id='sidebar'>
        <div className='download'>
          <div className='download-button-container'>
            <i className="fa fa-upload"></i>
            <span>Upload JSON</span>
            <input onChange={this.handleUpload} className='file-uploader' type='file' />
          </div>
        </div>
        <ul>
          {
            this.props.listOfFiles.map(function(filename, index) {
              if(this.props.currentFile == filename) {
                return (<li onClick={this.setCurrentFile.bind(this, filename)} className='currentFile' key={index}>{filename}</li>)
              } 
              return (<li onClick={this.setCurrentFile.bind(this,filename)} key={index}>{filename}</li>)
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;