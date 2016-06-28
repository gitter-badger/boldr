import React, { Component } from 'react';
import { Entity } from 'draft-js';


export default class Link extends Component {
  render() {
    const { url } = Entity.get(this.props.entityKey).getData();
    return (
      <a className="editor__link" href={ url } title={ url }>
        { this.props.children }
      </a>
    );
  }
}
