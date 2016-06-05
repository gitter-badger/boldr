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
import dark from 'app/theme';
import 'app/styles/app.scss';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fade} from 'material-ui/utils/colorManipulator';
import {
  cyan700,
  grey600,
  pinkA100, pinkA200, pinkA400,
  fullWhite
} from 'material-ui/styles/colors';
const blueIsh = '#272734';
const pinkish = '#DD144D';
const muiTheme = getMuiTheme({
  spacing: {
  iconSize: 24,
  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopDrawerMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56,
},
fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkish,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    alternateTextColor: '#40404E',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  }
});
class CoreLayout extends Component {

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
            { this.props.children }
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

CoreLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object
};
