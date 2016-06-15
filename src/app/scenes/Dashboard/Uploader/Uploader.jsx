import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { uploadFile } from './state/upload.actions';
import UploadsListing from './UploadsListing';
const style = {
  margin: 12
};
class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
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
        <Paper zDepth={ 2 }>
        <div className="row">
        <div className="col-sm-12 col-md">
          <Dropzone ref="dropzone" multiple={ false } accept={ 'image/*' } onDrop={ ::this.onDrop }>
              <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <RaisedButton label="Browse" secondary onClick={ ::this.onOpenClick } style={ style } />
          </div>
        <div className="col-sm-12 col-md">
          <UploadsListing />
          </div>
        </div>
        </Paper>
      </div>
      );
  }
}

export default Uploader;

Uploader.propTypes = {
  uploadActions: React.PropTypes.object
};
