import React from 'react';
import SiteLogo from 'common/components/SiteLogo';
function TopBar(props) {
  return (
  <div className="topbar">
    <div className="topbar__content">
    { /* @ToDo Build logic for this on the server */ }
    { /* It should be like /api/v1/boldr/settings */ }
      <SiteLogo SiteLogoOrTitle="Boldr" />
    </div>
  </div>
  );
}
TopBar.propTypes = {
  children: React.PropTypes.any
};

export default TopBar;
