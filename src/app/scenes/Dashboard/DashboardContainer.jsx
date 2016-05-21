import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render() {
    return (
      <div>

       <div className="container">
         DashboardContainer?
         { this.props.children }
       </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  children: React.PropTypes.node
};

export default DashboardContainer;
