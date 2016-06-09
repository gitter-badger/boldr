import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppDrawer from 'app/components/AppDrawer';
import * as boldrActions from 'app/state/boldr/boldr.actions';
import TopBar from 'app/components/TopBar';
import Loader from 'app/components/Loader';
import { checkTokenValidity } from 'app/state/auth/auth.actions';

import meta from 'core/meta';
import BoldrTheme from 'core/theme';
import 'app/styles/app.scss';

const muiTheme = getMuiTheme(BoldrTheme);
class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(checkTokenValidity);
  }

  handleToggle() { // eslint-disable-line
    this.props.dispatch(boldrActions.toggleSideBar());
  }

  render() {
    return (
          <MuiThemeProvider muiTheme={ muiTheme }>
          <div>
           <Helmet {...meta.app.head} />
            <TopBar handleToggle={ ::this.handleToggle } />
            <AppDrawer />
            <div className="wrap container-flud">
            { this.props.children }
            </div>
        </div>
        </MuiThemeProvider>
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
