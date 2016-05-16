import React, { Component } from 'react';
import { connect } from 'react-redux';
import Uploader from './Uploader';
class UploaderContainer extends Component {
  render() {
    return (
      <div>
       <div className="container">
       UploaderContainer
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(UploaderContainer);
