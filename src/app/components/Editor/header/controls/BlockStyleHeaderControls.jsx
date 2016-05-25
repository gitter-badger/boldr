import React, { PropTypes } from 'react';
import StyleButton from '../StyleButton';
import { BLOCK_TYPES } from '../BlockTypes';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
/**
 * Stateless function representing the list of block controls
 * for the rich text editorState
 *
 * @extends React.Component
 * @prop {object} editorState
 */
export const BlockStyleHeaderControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-header-controls">
    <IconMenu iconButtonElement={
        <IconButton touch>
          <NavigationExpandMoreIcon />
        </IconButton>
      }
    >
      { BLOCK_TYPES.map((type) =>
          <MenuItem
            key={ type.label }
            active={ type.style === blockType }
            primaryText={ type.label }
            onToggle={ props.onToggle }
          />
        )
      }
        </IconMenu>
    </div>
  );
};

BlockStyleHeaderControls.propTypes = {
  editorState: React.PropTypes.object,
  onToggle: React.PropTypes.func
};
