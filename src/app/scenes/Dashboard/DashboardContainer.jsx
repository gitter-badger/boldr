import React from 'react';

const DashboardContainer = props => {
  return (
     <div className="container">
       { props.children }
    </div>
  );
};

DashboardContainer.propTypes = {
  children: React.PropTypes.node
};

export default DashboardContainer;
