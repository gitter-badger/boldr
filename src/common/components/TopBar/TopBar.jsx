import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boldrActions from 'common/state/modules/boldr/boldr.actions';

import SiteLogo from '../SiteLogo';

@connect(state => ({ boldr: state.boldr }))
class TopBar extends React.Component {

  render() {
    return (
      <div className="topbar">
        <div className="topbar__content">
            { /* @ToDo Build logic for this on the server */ }
            { /* It should be like /api/v1/boldr/settings */ }
          <AppBar title={ <SiteLogo SiteLogoOrTitle="Boldr" /> }
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  onLeftIconButtonTouchTap={ this.props.handleToggle }
          />
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  dispatch: React.PropTypes.func
};

export default TopBar;
