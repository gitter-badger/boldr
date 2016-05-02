import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings.jsx';

class SettingsContainer extends Component {
  render() {
    return (
      <div>

       <div className="container">
       SettingsContainer
       { this.props.children }
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(Settings);
