// @flow
import React from 'react';
import StyleButton from '../StyleButton';
import FormatBold from 'material-ui/svg-icons/editor/format-bold';
import FormatItalic from 'material-ui/svg-icons/editor/format-italic';
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
const BOLD = (
    <span className="TextEditor-controls-button">
        <FormatBold />
    </span>
);

const ITALIC = (
    <span className="TextEditor-controls-button">
      <FormatItalic />
    </span>
);

const UNDERLINE = (
    <span className="TextEditor-controls-button">
        <FormatUnderlined />
    </span>
);

const SUBSCRIPT = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-subscript" aria-hidden="true"></i>
    </span>
);

const SUPERSCRIPT = (
    <span className="TextEditor-controls-button">
        <i className="fa fa-superscript" aria-hidden="true"></i>
    </span>
);

const INLINE_STYLES = [
   { label: BOLD, style: 'BOLD' },
   { label: ITALIC, style: 'ITALIC' },
   { label: UNDERLINE, style: 'UNDERLINE' },
   { label: SUBSCRIPT, style: 'SUBSCRIPT' },
   { label: SUPERSCRIPT, style: 'SUPERSCRIPT' }
];

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
        <div className="TextEditor-controls-bar">

                { INLINE_STYLES.map((type) =>
                    <StyleButton
                      key={ type.style }
                      active={ currentStyle.has(type.style) }
                      label={ type.label }
                      onToggle={ props.onToggle }
                      style={ type.style }
                    />
                ) }

        </div>
   );
};
