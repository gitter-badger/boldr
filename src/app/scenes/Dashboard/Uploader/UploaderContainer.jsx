import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Uploader from './Uploader';
import * as uploadActions from 'state/upload/upload.actions';

const mapStateToProps = (state, ownProps) => {
  return {
    upload: state.upload,
    droped: state.upload.droped,
    files: state.upload.files,
    message: state.upload.message,
    loading: state.upload.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadActions: bindActionCreators(uploadActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
