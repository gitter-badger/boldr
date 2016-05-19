import React from 'react';

export default function SiteLogo(props) {
  return (
  <div className="sitelogo">
    { props.SiteLogoOrTitle }
  </div>
);
}

SiteLogo.propTypes = {
  SiteLogoOrTitle: React.PropTypes.string
};
