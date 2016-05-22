/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppDrawer from 'app/components/AppDrawer';
import * as boldrActions from 'app/state/modules/boldr/boldr.actions';
import TopBar from 'app/components/TopBar';
import Loader from 'app/components/Loader';

import 'app/styles/app.scss';

class CoreLayout extends Component {
  handleToggle = () => { // eslint-disable-line
    this.props.dispatch(boldrActions.toggleSideBar());
  }

  render() {
    return (
          <div>
          <TopBar handleToggle={ this.handleToggle } />
          <AppDrawer />
          { this.props.children }
        </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    router: state.router,
    boldr: state.boldr
  };
}

export default connect(mapStateToProps, null)(CoreLayout);
