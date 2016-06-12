import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getUser } from 'state/user/user.actions';
const style = {
  backgroundColor: '#40404E',
  margin: 20,
  padding: 20
};
class Profile extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(getUser(this.state.params.userId));
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  render() {
    return (
       <div className="container">
        <Paper style={ style } zDepth={ 3 }>
         Profile

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

Profile.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getUser })(Profile);
