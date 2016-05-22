import React from 'react';

class SaveDraftButton extends React.Component {

  render() {
    return (
      <a className="waves-effect waves-light red lighten-1 btn" onClick={this.props.onSaveDraft} >Save Draft</a>
    )
  }
}

SaveDraftButton.propTypes = {
  onSaveDraft: React.PropTypes.func.isRequired
};
export default SaveDraftButton;
