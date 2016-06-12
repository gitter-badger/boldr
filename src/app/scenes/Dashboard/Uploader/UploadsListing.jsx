import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { lightWhite } from 'material-ui/styles/colors';
import { getUploads } from './state/upload.actions';
import Loader from 'shared/atm.Loader';

class UploadsListing extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(getUploads());
  }

  constructor(props) {
    super(props);
    this.createUploadList = (uploadsList) => this._createUploadList(uploadsList);
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  _createUploadList(files) {
    const uploadsList = [];
    for (let file of files) { // eslint-disable-line
      uploadsList.push(
        <div>
        <ListItem key={ file.id } primaryText={ file.originalname }>
        { file.s3url }
        </ListItem>
        <Divider inset />
        </div>
      );
    }
    return uploadsList;
  }
  render() {
    const { loading, upload } = this.props;
    let uploadsList = this.createUploadList(this.props.upload.files);
    return (
      <div>
      <Helmet title="Articles" />
       <Paper zDepth={ 2 }>
       <div className="col-xs-12 col-md-6 col-lg-4">
       <List>
       <Subheader>Uploads</Subheader>
       { uploadsList }
         </List>
         </div>
       </Paper>
      </div>
      );
  }
}

UploadsListing.propTypes = {
  loading: PropTypes.bool,
  upload: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  upload: state.upload,
  loading: state.upload.loading
});

export default connect(mapStateToProps, null)(UploadsListing);
