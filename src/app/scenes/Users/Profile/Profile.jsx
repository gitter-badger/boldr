import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import * as userActionCreators from 'state/user/user.actions';

const style = {
  backgroundColor: '#40404E',
  margin: 20,
  padding: 20
};
class Profile extends Component {

  componentWillMount(props) {
    const userId = this.props.params.id;
    this.props.userActions.getUser(userId);
  }
  render() {
    return (
       <div className="container">
        <Paper style={ style } zDepth={ 3 }>
         Profile for { this.props.user.firstname}
       </Paper>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
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
Profile.propTypes = {
  dispatch: React.PropTypes.func,
  userActions: React.PropTypes.object,
  params: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
