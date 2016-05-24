import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
  Entity,
  CompositeDecorator
} from 'draft-js';

import {
  styleMap,
  getBlockStyle,
  findLinkEntities,
  Link
} from './utilities';

class Display extends Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    const blocks = convertFromRaw(JSON.parse(props.content));
    this.state = { editorState: EditorState.createWithContent(blocks, decorator) };
  }

  render() {
    return (
      <div>
        <div>
          <Editor
            blockStyleFn={ getBlockStyle }
            customStyleMap={ styleMap }
            editorState={ this.state.editorState }
            readOnly
          />
        </div>
      </div>
    );
  }
}

Display.propTypes = {
  content: PropTypes.string.isRequired
};

export default Display;
