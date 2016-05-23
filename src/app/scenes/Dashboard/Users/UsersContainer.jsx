import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { getUsersList } from 'app/state/modules/user/user.actions';
import Loader from 'app/components/Loader';
class UsersContainer extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(getUsersList());
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  render() {
    const { loading, user } = this.props;
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

export default connect(mapStateToProps, null)(UsersContainer);
