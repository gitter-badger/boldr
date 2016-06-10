import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppDrawer from 'components/AppDrawer';
import * as boldrActions from 'state/boldr/boldr.actions';
import TopBar from 'components/TopBar';
import DashboardContainer from 'scenes/Dashboard/DashboardContainer';
import Loader from 'shared/atm.Loader';

class DashboardLayout extends Component {

  handleToggle = () => {
    this.props.dispatch(boldrActions.toggleSideBar());
  }

  render() {
    return (
      <div>
        { this.props.children }
    </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    boldr: state.boldr
  };
}

export default connect(mapStateToProps, null)(DashboardLayout);

DashboardLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object
};
