import React from 'react';
import { BlockStyleHeaderControls } from './controls/BlockStyleHeaderControls';
import { InlineStyleHeaderControls } from './controls/InlineStyleHeaderControls';
import LinkHeaderControls from './controls/LinkHeaderControls';
import MediaHeaderControls from './controls/MediaHeaderControls';
import { RichUtils } from 'draft-js';

class EditorHeader extends React.Component {

  constructor(props) {
    super(props);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.onChange = (editorState) => this.props.onChange(editorState);
  }

  _toggleBlockType(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState, onFocus } = this.props;

    return (
    <div className="RichEditor-header">
      <BlockStyleHeaderControls
        editorState={ editorState }
        onToggle={ this.toggleBlockType }
      />
      <InlineStyleHeaderControls
        editorState={ editorState }
        onToggle={ this.toggleInlineStyle }
      />
      <LinkHeaderControls
        editorState={ editorState }
        onChange={ this.onChange }
        onFocus={ onFocus }
      />
      <MediaHeaderControls
        editorState={ editorState }
        onChange={ this.onChange }
        onFocus={ onFocus }
      />
    </div>
    );
  }

}

EditorHeader.propTypes = {
  editorState: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired
};

export default EditorHeader;
