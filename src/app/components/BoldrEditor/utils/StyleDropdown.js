import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class StyleDropdown extends React.Component {
  constructor() {
    super();
    this.changeSelectHandler = (event) => this._changeSelectHandler(event);

    this.state = {
      selectedBlockType: 'Default',
      value: 1
    };
  }

  handleChange = (event, index, value) => this.setState({
    value
  });

  _changeSelectHandler(value) {
    const style = this.props.blockTypes.reduce((result, type) => {
      if (!!result) {
        return result;
      } else if (type.label === value) {
        return type.style;
      }
    }, null);

    this.setState({
      selectedBlockType: value
    });
    this.props.onChange(style);
  }

  /**
   * TODO: Correctly remove texteditor controls button, and ensure correct rendering of style
   */
  render() {
    let className = 'TextEditor-controls-button';
    if (this.props.active) {
      className += ' TextEditor-controls-active';
    }

    return (
      <DropDownMenu value={ this.state.value } title={ this.state.selectedBlockType }
        onChange={ this.handleChange } onSelect={ this.changeSelectHandler }
      >
      { this.props.blockTypes.map((type) => {
        return (
          <MenuItem eventKey={ type.label } value={ type.label } key={ type.label } id={ type.label }>
            { type.label }
          </MenuItem>
          );
      })}
      </DropDownMenu>
      );
  }
}

// StyleButton.propTypes = {
//     onToggle: React.PropTypes.function,
//     style: React.PropTypes.boolean,
//     active: React.PropTypes.boolean,
//     label: React.PropTypes.string
// };
