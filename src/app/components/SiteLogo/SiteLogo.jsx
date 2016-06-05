import React from 'react';
import BoldrLogo from './BoldrLogo';

const inlineStyles = {
  verticalAlign: 'top'
};
export default function SiteLogo(props) {
  return (
  <div className="sitelogo">
  <BoldrLogo width="60px" height="60px" />
    <span style={ inlineStyles }>{ props.SiteLogoOrTitle }</span>
  </div>
);
}

SiteLogo.propTypes = {
  SiteLogoOrTitle: React.PropTypes.string
};
