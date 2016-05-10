import React, { Component } from 'react';
import { connect } from 'react-redux';
import Users from './Users';
class UsersContainer extends Component {
  render() {
    return (
      <div>
       <div className="container">
       Users
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(UsersContainer);
