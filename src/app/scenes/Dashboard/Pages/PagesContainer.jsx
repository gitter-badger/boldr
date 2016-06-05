import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { getPagesList } from 'app/state/page/page.actions';
import Pages from './Pages';

const style = {
  backgroundColor: '#40404E',
  margin: 20,
  padding: 20
};
const fabStyle = {
  position: 'absolute',
  bottom: 10,
  right: 10
};
const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page,
    loading: state.page.loading
  };
};

@connect(mapStateToProps, null)
export default class PagesContainer extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(getPagesList());
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  render() {
    return (
       <div className="container">
         <Paper style={ style } zDepth={ 3 }>
          <h1>Page Editor</h1>

          <Pages />
        </Paper>
        <FloatingActionButton style={ fabStyle }>
          <ContentAdd />
        </FloatingActionButton>
       </div>
    );
  }
}

PagesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};
