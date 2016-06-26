import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from 'state/auth/auth';
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SiteLogo from 'components/SiteLogo';
const inlineStyle = {
  backgroundColor: '#fff'
};
const iconColor = '#8F8F8F';
const inlineStyles = {
  appBar: {
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    height: 56,
    minHeight: 56,
    padding: '4px 10%',
    border: '1px solid #f3f3f3'
  },
  title: {
    color: iconColor,
    fontSize: '1.6rem',
    lineHeight: '5.0rem',
    cursor: 'pointer'
  },
  elementRight: {
    height: 48,
    minHeight: 48,
    marginTop: 0
  },
  gitHubButton: {
    color: iconColor,
    margin: 0
  },
  iconStyles: {
    height: 48,
    marginTop: 0
  }
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
          <AppBar
            title={ <SiteLogo SiteLogoOrTitle="Boldr" /> }
            showMenuIconButton={ false }
            zDepth={ 2 }
            style={ inlineStyle }
            onTitleTouchTap={ this.handleHome }
            onLeftIconButtonTouchTap={ ::this.props.handleToggle }
            iconStyleRight={ inlineStyles.elementRight }
            iconElementRight={
                    <div>
                        <Link to="/about" >
                            <IconButton>
                                <SocialPerson color={ iconColor } />
                            </IconButton>
                        </Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

TopBar.propTypes = {
  dispatch: PropTypes.func,
  handleToggle: PropTypes.func,
  handleClickLogin: PropTypes.func,
  handleClickRegister: PropTypes.func,
  handleHome: PropTypes.func,
  user: PropTypes.object,
  signoutUserAction: PropTypes.func,
  actions: PropTypes.object
};
