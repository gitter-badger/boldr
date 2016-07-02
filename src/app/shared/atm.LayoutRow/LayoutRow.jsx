import React, { PropTypes } from 'react';

const LayoutRow = ({ children }) => {
  return (
    <div className="bldr-layout__row">
      { children }
    </div>
  );
};

export default LayoutRow;

LayoutRow.propTypes = {
  children: PropTypes.element
};
