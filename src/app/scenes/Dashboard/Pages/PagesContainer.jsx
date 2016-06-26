import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { getPagesList } from 'state/page/page';
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
  state = {
    open: false
  };
  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }

  handleNewPageClick() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={ ::this.handleClose }
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={ ::this.handleClose }
      />
    ];
    return (
       <div className="container">
         <Paper style={ style } zDepth={ 3 }>
          <h1>Page Editor</h1>
          <Pages />
        </Paper>
        <FloatingActionButton style={ fabStyle } onTouchTap={ ::this.handleNewPageClick }>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Create a new page"
          actions={ actions }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ ::this.handleClose }
        >
         The first thing you'll need to do is give your page a title, description and a slug for the URL.
        </Dialog>
       </div>
    );
  }
}

PagesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};
