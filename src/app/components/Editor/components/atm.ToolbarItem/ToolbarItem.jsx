import React, { Component } from 'react';
import classNames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import Separator from '../atm.Separator';


export default class ToolbarItem extends Component {
  toggleAction(action) {
    if (action.toggle) {
      action.toggle(!action.active);
    }
  }

  render() {
    const Icon = this.props.item.icon;

    if (this.props.item.type === 'separator') {
      return (
        <Separator />
      );
    }

    const className = classNames('toolbar__item', {
      'toolbar__item--active': this.props.active
    });

    return (
      <li style={ { display: 'inline' } } className={ className }>
        <FlatButton onTouchTap={ () => this.toggleAction(this.props) } icon={ <Icon /> } />
      </li>
    );
  }
}
