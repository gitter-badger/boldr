import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const SaveDraftButton = (props) => {
  return (
    <RaisedButton
      label="Save Draft"
      linkButton={ false }
      secondary
      onClick={ props.onSaveDraft }
    />
  );
};

SaveDraftButton.propTypes = {
  onSaveDraft: React.PropTypes.func.isRequired
};
export default SaveDraftButton;
