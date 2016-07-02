import React, { PropTypes } from 'react';

const LayoutColumn = (props) => {
  const width = `${(props.width * 100).toPrecision(5)}%`;

  return (
    <div className="bldr-layout__column" style={{ width }}>
      { props.children }
    </div>
  );
};

export default LayoutColumn;

LayoutColumn.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number.isRequired
};
