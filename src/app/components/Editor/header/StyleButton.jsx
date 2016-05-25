import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

/**
 * Class representing a control button for styles on the editor
 * @extends React.Component
 * @prop {boolean} active
 * @prop {string} label
 * @prop {function} onToggle
 * @prop {string} style
 */
class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <FlatButton className={ className } label={ this.props.label } onMouseDown={ this.onToggle } />
      );
  }
}

StyleButton.propTypes = {
  onToggle: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.string,
  active: PropTypes.bool
};

export default StyleButton;
