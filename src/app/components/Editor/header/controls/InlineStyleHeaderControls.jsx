import React from 'react';
import StyleButton from '../StyleButton';
import { INLINE_STYLES } from '../InlineStyleTypes';

/**
 * Stateless component provides the inline controls for our rich text editor
 * @prop {object} editorState
 * @prop {object[]} inlineStyles
 * @prop {function} onToggle
 */
export const InlineStyleHeaderControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-header-controls">
      { INLINE_STYLES.map(type =>
        <StyleButton
          key={ type.label }
          active={ currentStyle.has(type.style) }
          label={ type.label }
          onToggle={ props.onToggle }
          style={ type.style }
        />
        )
      }
    </div>
    );
};

InlineStyleHeaderControls.propTypes = {
  editorState: React.PropTypes.object,
  inlineStyles: React.PropTypes.array,
  onToggle: React.PropTypes.func
};
