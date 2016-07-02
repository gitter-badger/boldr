import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
// Material UI
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
// Boldr
import { logoutUser } from 'state/auth/auth';
import SiteLogo from 'shared/atm.SiteLogo';
// Styles
import inlineStyles, { iconColor } from './inlineStyles';

@connect(mapStateToProps, mapDispatchToProps)
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5']
    };
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

  handleClickHome() {
    const path = '/';
    browserHistory.push(path);
  }
  handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value
    });
  };

  handleChangeMultiple = (event, value) => {
    this.setState({
      valueMultiple: value
    });
  };

  handleOpenMenu = () => {
    this.setState({
      openMenu: true
    });
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    });
  }
  render(): any {
    return (
      <div className="topbar">
        <div className="topbar__content">
            { /* @ToDo Build logic for this on the server */ }
            { /* It should be like /api/v1/boldr/settings */ }
          <AppBar
            title={ <SiteLogo SiteLogoOrTitle="Boldr" /> }
            showMenuIconButton={ false }
            zDepth={ 2 }
            style={ inlineStyles.appbar }
            onTitleTouchTap={ ::this.handleClickHome }
            iconStyleRight={ inlineStyles.elementRight }
            iconElementRight={
                    <div>
                      <IconMenu
                        iconButtonElement={ <IconButton><SocialPerson color={ iconColor } /></IconButton> }
                        onChange={ ::this.handleChangeSingle }
                        value={ this.state.valueSingle }
                      >
                        <MenuItem value="1"><Link to="/login">Login</Link></MenuItem>
                        <MenuItem value="2"><Link to="/register">Register</Link></MenuItem>
                        <MenuItem value="3"><Link to="/register">Sign Out</Link></MenuItem>
                      </IconMenu>
                        <Link to="/blog" >
                            <IconButton>
                                <ActionDescription color={ iconColor } />
                            </IconButton>
                        </Link>
                        <Link to="/dashboard" >
                            <IconButton>
                                <AvWeb color={ iconColor } />
                            </IconButton>
                        </Link>
                    </div>
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

export default TopBar;

TopBar.propTypes = {
  dispatch: PropTypes.func,
  handleToggle: PropTypes.func,
  handleClickLogin: PropTypes.func,
  handleClickRegister: PropTypes.func,
  handleHome: PropTypes.func,
  user: PropTypes.object,
  signoutUserAction: PropTypes.func,
  actions: PropTypes.object,
  onTitleTouchTap: PropTypes.func,
  rounded: PropTypes.bool,
  zDepth: PropTypes.number
};
