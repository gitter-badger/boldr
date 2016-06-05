import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import AppDrawer from 'app/components/AppDrawer';
import * as boldrActions from 'app/state/boldr/boldr.actions';
import TopBar from 'app/components/TopBar';
import Loader from 'app/components/Loader';
import { checkTokenValidity } from 'app/state/auth/auth.actions';

import meta from '../../meta';
import 'app/styles/app.scss';

class CoreLayout extends Component {

  componentDidMount() {
    this.props.dispatch(checkTokenValidity);
  }

  handleToggle() { // eslint-disable-line
    this.props.dispatch(boldrActions.toggleSideBar());
  }

  render() {
    return (
          <div>
           <Helmet {...meta.app.head} />
            <TopBar handleToggle={ ::this.handleToggle } />
            <AppDrawer />
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

export default connect(mapStateToProps, null)(CoreLayout);

CoreLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object
};
