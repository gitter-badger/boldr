import React, { PropTypes } from 'react';

const LayoutContainer = ({ children }) => {
  return (
    <div className="bldr-layout__container">
      { children }
    </div>
  );
};

export default LayoutContainer;

LayoutContainer.propTypes = {
  children: PropTypes.element
};
