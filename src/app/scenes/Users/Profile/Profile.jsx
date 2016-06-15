import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import * as userActionCreators from 'state/user/user.actions';

const style = {
  backgroundColor: '#40404E',
  margin: 20,
  padding: 20
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  componentWillMount(props) {
    const userId = this.props.params.id;
    this.props.userActions.getUser(userId);
  }
  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    return (
       <div className="container">
        <Paper style={ style } zDepth={ 3 }>
        <Card expanded={ this.state.expanded } onExpandChange={ this.handleExpandChange }>
        <CardHeader
          title={ this.props.user.firstname }
          subtitle={ this.props.user.lastname }
          avatar={ this.props.user.avatar }
          actAsExpander
          showExpandableButton
        />
        <CardText>
          <Toggle
            toggled={ this.state.expanded }
            onToggle={ this.handleToggle }
            labelPosition="right"
          />

        </CardText>
        <CardText expandable>
        { this.props.user.website }

        { this.props.user.location }
        { this.props.user.bio }
        </CardText>
         </Card>
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
  params: React.PropTypes.object,
  user: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
