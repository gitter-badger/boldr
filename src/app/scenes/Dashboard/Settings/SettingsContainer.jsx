import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Settings from './Settings';
import { loadBoldrSettings } from 'state/boldr/boldr';
const style = {
  backgroundColor: '#40404E',
  margin: 20,
  padding: 20
};
class SettingsContainer extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(loadBoldrSettings());
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  render() {
    return (
       <div className="container">
        <Paper style={ style } zDepth={ 3 }>
         SettingsContainer
         <Settings />
       </Paper>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boldr: state.boldr,
    loading: state.boldr.loading
  };
};

SettingsContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(SettingsContainer);
