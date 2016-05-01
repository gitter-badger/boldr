import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppDrawer from '../../components/AppDrawer';
import * as boldrActions from '../../redux/modules/boldr/boldr.actions';
import TopBar from '../../components/TopBar';
import Loader from '../../components/Loader';
// *** STYLES *** //
import '../../styles/app.scss';

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
