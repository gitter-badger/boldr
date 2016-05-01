import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentState
} from 'draft-js';

import { InlineStyleControls, BlockStyleControls } from 'common/components/Editor';

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    // const title = decodeURI(window.location.pathname.split('/')[2]);

    // setTimeout(() => {
    //   this.loadContent(props);
    // }, 100);
  }
  componentDidMount() {
    this.focus = () => this.refs.editor.focus();
  }

  // componentWillReceiveProps(props) {
  //   this.loadContent(props);
  // }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  render() {
    const { editorState } = this.state;

    let className = 'editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
        <div className="RichEditor-root">

          <div>
            <div>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />

            </div>
            <div className="editor-container">
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  ref="editor"
                />
              </div>
            </div>
          </div>

        </div>
    );
  }
}

export default CreatePost;
