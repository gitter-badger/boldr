import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadFile } from 'state/upload/upload.actions';
import Dropzone from 'react-dropzone';
import axios from 'axios';
class Uploader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }
  onDropAccepted(func, files) {
    console.log(files) // eslint-disable-line
  }

  onDrop(file) {
    const image = new FormData();
    image.append('image', file[0]);
    axios.post('/api/v1/uploads', image)
      .then(response => {
        if (response.status === 201) {
          console.log(response, '--- is this it')// eslint-disable-line
        }
      })
      .catch(err => {
        console.log(err)// eslint-disable-line
      });
  }
  onOpenClick() {
    this.refs.dropzone.open();
  }
  render() {
    return (
      <div>
       <div className="container">
       UploaderContainer
       <div>
      <Dropzone ref="dropzone" multiple={ false } accept={ 'image/*' } onDrop={ ::this.onDrop }>
          <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <button type="button" onClick={ ::this.onOpenClick }>
          Open Dropzone
      </button>
        </div>
       </div>
      </div>
      );
  }
}

export default Uploader;

Uploader.propTypes = {
  uploadActions: React.PropTypes.object
};
