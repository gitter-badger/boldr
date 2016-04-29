import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppDrawer from 'common/components/AppDrawer';
import * as boldrActions from 'common/redux/modules/boldr/boldr.actions';
import TopBar from 'common/components/TopBar';
import Loader from 'common/components/Loader';
// *** STYLES *** //
import 'common/styles/app.scss';

@connect(mapStateToProps)
class CoreLayout extends Component {
  handleToggle = () => {
    this.props.dispatch(boldrActions.toggleSideBar());
  }

  render() {
    // if (this.props.boldr.isLoading) {
    //   return (
    //       <Loader />
    //   );
    // }
    return (
        <div>
        <TopBar handleToggle={this.handleToggle} />
        <AppDrawer />
        { this.props.children }
    </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    router: state.router,
    boldr: state.boldr
  };
}

export default CoreLayout;
