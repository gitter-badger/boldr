import React from 'react';
import FlatButton from 'material-ui/FlatButton';
class StyleButton extends React.Component {
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
      <FlatButton className={className} label={this.props.label} onMouseDown={this.onToggle} />
      );
  }
}

export default StyleButton;
