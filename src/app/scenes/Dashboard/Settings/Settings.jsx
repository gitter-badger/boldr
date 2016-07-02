import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import GeneralForm from 'scenes/Dashboard/org.Forms/GeneralForm';
const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
  >
    <MoreVertIcon />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={ iconButtonElement }>
    <MenuItem>View</MenuItem>
    <MenuItem>Modify</MenuItem>
  </IconMenu>
);

class Settings extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleSubmit = () => {
    console.log('submit')
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
      <List>
        <Subheader>General</Subheader>
        <ListItem
          primaryText="Site"
          onTouchTap={ ::this.handleOpen }
          secondaryText="Modify general settings for your site."
          rightIconButton={ rightIconMenu }
        />
        <Dialog
          title="General Site Settings"
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
        >
          Here you can make changes to your Boldr site settings.
          <GeneralForm onSubmit={ ::this.handleSubmit } />
        </Dialog>
        <ListItem
          primaryText="TBD"
          secondaryText="Coming later."
        />
      </List>
      <Divider />
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
export default connect(mapStateToProps, null)(Settings);
