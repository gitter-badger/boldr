import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppDrawer from 'common/components/AppDrawer';
import * as boldrActions from 'common/state/modules/boldr/boldr.actions';
import TopBar from 'common/components/TopBar';
import Loader from 'common/components/Loader';
import 'common/styles/app.scss';

class CoreLayout extends Component {
  handleToggle = () => {
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
