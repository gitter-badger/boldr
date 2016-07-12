import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Col, Row, Container } from 'components/index';
import { loadBoldrSettings, saveBoldrSetup } from 'state/modules/boldr';
import SetupForm from '../atm.SetupForm';
@provideHooks({
  fetch: ({ dispatch }) => dispatch(loadBoldrSettings())
})
class Setup extends Component {
  handleSubmit(values) {
    this.props.dispatch(saveBoldrSetup(values));
  }
  render() {
    return (
      <div>
        <Toolbar style={ { backgroundColor: 'rgb(64, 64, 78)' } }>
          <ToolbarGroup>
            <ToolbarTitle text="Setup" style={ { color: 'rgba(237, 237, 237, 1)' } } />
          </ToolbarGroup>
        </Toolbar>
        <SetupForm onSubmit={ ::this.handleSubmit } />

      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    boldr: state.boldr,
    isLoading: state.boldr.isLoading
  };
};
export default connect(mapStateToProps)(Setup);
