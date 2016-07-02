import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { getUsersList } from 'state/user/user';
import Loader from 'shared/atm.Loader';

@connect(mapStateToProps, null)
class UsersContainer extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(getUsersList());
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  render() {
    const { loading } = this.props;
    return (
      <div>
       <div className="container">
        { loading ? <Loader /> : <Users /> }
       </div>
      </div>
    );
  }
}

UsersContainer.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.user.loading
});

export default UsersContainer;
