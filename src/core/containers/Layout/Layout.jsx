import React from 'react';

export const LayoutContainer = ({ children }) => (
  <div>
      {children}
  </div>
);

LayoutContainer.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default LayoutContainer;
