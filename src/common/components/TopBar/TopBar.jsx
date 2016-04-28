import React from 'react';

export default function TopBar(props) {
  return (
  <div className="topbar">
    <div className="topbar__content">
      { props.children }
    </div>
  </div>
  );
}
TopBar.propTypes = {
  children: React.PropTypes.any
};
