import React from 'react';
import BoldrLogo from 'shared/atm.BoldrLogo';

const inlineStyles = {
  verticalAlign: 'top',
  color: '#333'
};
const inlineStyle = {
  paddingTop: '5px'
};
export default function SiteLogo(props) {
  return (
  <div className="sitelogo" style={ inlineStyle }>
  <BoldrLogo width="50px" height="50px" />
    <span style={ inlineStyles }>{ props.SiteLogoOrTitle }</span>
  </div>
);
}

SiteLogo.propTypes = {
  SiteLogoOrTitle: React.PropTypes.string
};
