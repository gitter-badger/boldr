import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, MenuItem, Colors, List, ListItem, MakeSelectable } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import * as boldrActions from 'common/state/modules/boldr/boldr.actions';
import NavLink from '../nav-link.jsx';
let SelectableList = MakeSelectable(List);
const iconStyles = {
  marginRight: 12,
  position: 'relative',
  top: 6
};

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: React.PropTypes.node.isRequired,
      defaultValue: React.PropTypes.number.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });

      this.props.routeToIndex(index);
    };

    render() {
      return (
          <ComposedComponent
              value={this.state.selectedIndex}
              onChange={this.handleRequestChange}
          >
              {this.props.children}
          </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

@connect(state => ({ boldr: state.boldr }))
class AppDrawer extends React.Component {

  handleToggle = () => {
    this.props.dispatch(boldrActions.toggleSideBar());
  }

  render() {
    const { boldr, dispatch } = this.props;
    return (
      <Drawer onBlur={ this.handleToggle } width={ 240 } open={ boldr.isSideBarOpen } docked={ false }
          onRequestChange={open => { this.handleToggle(); } }>

        <SelectableList defaultValue={ boldr.selectedDrawerMenuListItem } boldr={ boldr }
            {...bindActionCreators(boldrActions, dispatch)} >

          <ListItem primaryText="Home" value={ 1 } />
          <ListItem primaryText="Blog" value={ 2 } />
          <ListItem primaryText="Dashboard" value={ 3 }
              initiallyOpen={ false }
              primaryTogglesNestedList={ true }
              nestedItems={[
                <ListItem
                    value={ 4 }
                    primaryText="Articles"
                    nestedItems={[
                      <ListItem
                          value={ 5 }
                          primaryText="List articles"
                      />,
                      <ListItem
                          value={ 6 }
                          primaryText="Create article"
                      />
                    ]}
                />,
                <ListItem primaryText="Settings" value={ 7 } />
              ]}
          />
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppDrawer;
