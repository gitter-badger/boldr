import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'state/user/user.actions';
import Profile from './Profile';
const ProfileContainer = (props) => {
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

ProfileContainer.propTypes = {
  children: React.PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
