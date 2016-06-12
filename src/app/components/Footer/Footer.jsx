import React from 'react';

const footerStyle = {
  width: '100%',
  height: '80px',
  backgroundColor: 'rgba(0, 0, 0, .2)',
  boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
  position: 'absolute',
  marginTop: '20px',
  bottom: 0,
  left: 0
};
const footerH3 = {
  color: 'rgb(229, 0, 80)'

};
const footerSub = {
  color: '#e9e9e9',
  fontSize: '.9rem',
  fontVariant: 'small-caps'
};
const footerWrap = {
  verticalAlign: 'middle',
  paddingTop: '1rem'
};
const Footer = () => {
  return (
    <div style={ footerStyle }>
    <div className="row center-xs">
      <div className="col-xs-6">
        <div style={ footerWrap }>
          <h3 style={ footerH3 }>Boldr<span style={ footerSub }> Carefully constructed in Colorado</span></h3>
          </div>
      </div>
    </div>
    </div>
  );
};
export default Footer;
