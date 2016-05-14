import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppDrawer from '../../components/AppDrawer';
import * as boldrActions from 'common/state/modules/boldr/boldr.actions';
import TopBar from '../../components/TopBar';
import Loader from '../../components/Loader';
import 'common/styles/app.scss';

@connect(mapStateToProps)
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

DashboardLayout.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    router: state.router,
    boldr: state.boldr
  };
}

export default DashboardLayout;
