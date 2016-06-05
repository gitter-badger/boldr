import React from 'react';
import FormatQuote from 'material-ui/svg-icons/editor/format-quote';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted';

import StyleButton from '../StyleButton';

const OL = (
    <span className="TextEditor-controls-button">
    <FormatListNumbered />
    </span>
);

const UL = (
    <span className="TextEditor-controls-button">
      <FormatListBulleted />
    </span>
);

const BLOCK_QUOTE = (
    <span className="TextEditor-controls-button">
      <FormatQuote />
    </span>
);

/**
 * Array of types of block styles that can be made in our text editor.
 * @type {Array}
 */
const BLOCK_TYPES = [
   { label: BLOCK_QUOTE, style: 'blockquote' },
   { label: UL, style: 'unordered-list-item' },
   { label: OL, style: 'ordered-list-item' }
];

export const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

  return (
      <div className="TextEditor-controls-bar">
      { BLOCK_TYPES.map((type) => {
        return (
          <StyleButton
            key={ type.style }
            active={ type.style === blockType }
            label={ type.label }
            onToggle={ props.onToggle }
            style={ type.style }
          />
          );
      }) }
      </div>
  );
};

// BlockStyleControls.propTypes = {
//   editorState: React.PropTypes.func,
//   onToggle: React.PropTypes.func
// };
