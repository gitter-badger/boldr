import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import LocIcon from 'material-ui/svg-icons/action/explore';
import WebIcon from 'material-ui/svg-icons/action/language';
import * as userActionCreators from 'state/user/user';
import { List, ListItem } from 'material-ui/List';
const style = {
  backgroundColor: '#40404E',
  margin: 20,
  padding: 20
};
const styles = {
  container: {
    margin: '15px 10px 0'
  },
  details: {
    paddingTop: 0
  }
};
const infos = [
  { id: 'email', icon: <EmailIcon />, href: 'mailto:' },
  { id: 'website', icon: <WebIcon />, href: 'tel:' },
  { id: 'location', icon: <LocIcon />, date: true }
];
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

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    userActions: React.PropTypes.object,
    params: React.PropTypes.object,
    user: React.PropTypes.object
  };
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
        <Card expanded={ this.state.expanded } onExpandChange={ this.handleExpandChange } style={ styles.container }>
        <CardHeader
          title={ this.props.user.firstname }
          subtitle={ this.props.user.lastname }
          avatar={ this.props.user.avatar }
          actAsExpander
          showExpandableButton
        />
        <CardText expandable style={ styles.details }>
        <List>
          <ListItem
            key="1"
            leftIcon={ <WebIcon /> }
            primaryText={ this.props.user.website }
          />
          <ListItem
            key="2"
            leftIcon={ <LocIcon /> }
            primaryText={ this.props.user.location }
          />
        { this.props.user.website }

        { this.props.user.location }
        { this.props.user.bio }
        </List>
        </CardText>
         </Card>
       </Paper>
       </div>
    );
  }
}
