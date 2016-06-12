import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'state/user/user.actions';

const UsersContainer = (props) => {
  return (
     <div>
     { props.children }
     </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    loading: state.user.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

UsersContainer.propTypes = {
  children: React.PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
