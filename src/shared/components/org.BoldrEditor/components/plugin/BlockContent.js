import React, { Component } from 'react';

export default class BlockContent extends Component {
  render() {
    return (
      <div className="block__content">
        { this.props.children }
      </div>
    );
  }
}
