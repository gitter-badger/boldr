import React from 'react';
import StyleButton from '../StyleButton';
import { INLINE_STYLES } from '../InlineStyleTypes';

export const InlineStyleHeaderControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-header-controls">
            {INLINE_STYLES.map(type => <StyleButton
      key={type.label}
      active={currentStyle.has(type.style)}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      />
    )}
        </div>
    );
};
