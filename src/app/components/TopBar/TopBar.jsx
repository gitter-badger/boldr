import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import * as boldrActions from 'app/state/boldr/boldr.actions';
import { logoutUser } from 'state/auth/auth';
import { browserHistory } from 'react-router';
import SiteLogo from 'components/SiteLogo';
const inlineStyle = {
  backgroundColor: '#fff'
};

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  handleClickLogin(event) {
    const path = '/login';
    browserHistory.push(path);
  }

  handleClickRegister(event) {
    const path = '/register';
    browserHistory.push(path);
  }

  handleClickSignout(event, dispatch) {
    this.props.actions.logoutUser();
  }

  handleHome() {
    const path = '/';
    browserHistory.push(path);
  }
  render(): any {
    return (
      <div className="topbar">
        <div className="topbar__content">
            { /* @ToDo Build logic for this on the server */ }
            { /* It should be like /api/v1/boldr/settings */ }
          <AppBar title={ <SiteLogo SiteLogoOrTitle="Boldr" /> }
            zDepth={ 2 }
            style={ inlineStyle }
            onTitleTouchTap={ this.handleHome }
            onLeftIconButtonTouchTap={ ::this.props.handleToggle }
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
              >
              {
                this.props.user.isAuthenticated ?
                  <MenuItem onTouchTap={ ::this.handleClickSignout } primaryText="Sign out" /> :
                  <div>
                    <MenuItem onTouchTap={ this.handleClickRegister } primaryText="Register" />
                    <MenuItem onTouchTap={ this.handleClickLogin } primaryText="Login" />
                  </div>
              }
              </IconMenu>
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boldr: state.boldr,
    user: state.user,
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ logoutUser }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

TopBar.propTypes = {
  dispatch: PropTypes.func,
  handleToggle: PropTypes.func,
  handleClickLogin: PropTypes.func,
  handleClickRegister: PropTypes.func,
  handleHome: PropTypes.func,
  user: PropTypes.object,
  signoutUserAction: PropTypes.func
};
