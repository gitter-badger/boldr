import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'state/user/user';

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
    userActions: bindActionCreators(userActionCreators, dispatch)
  };
};

UsersContainer.propTypes = {
  children: React.PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
