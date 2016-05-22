import React, { Component } from 'react';
import { Editor, RichUtils } from 'draft-js';

class EditorContent extends Component {

  constructor(props) {
    super(props);

    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { blockStyleFn, blockRendererFn, customStyleMap, onChange, editorState } = this.props;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-content';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className={ className } onClick={ this.focus }>
        <Editor
          blockRendererFn={ blockRendererFn }
          blockStyleFn={ blockStyleFn}
          customStyleMap={ customStyleMap }
          editorState={ editorState }
          handleKeyCommand={ this.handleKeyCommand }
          onChange={ onChange }
          placeholder="Tell a story..."
          ref="editor"
          spellCheck={ true }
        />
      </div>
    );
  }
}

EditorContent.propTypes = {
  blockStyleFn: React.PropTypes.func.isRequired,
  blockRendererFn: React.PropTypes.func.isRequired,
  customStyleMap: React.PropTypes.object.isRequired,
  editorState: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};
export default EditorContent;
