import React from 'react';
import StyleButton from '../StyleButton';

class UrlInputField extends React.Component {

  constructor(props) {
    super(props);

    this.onURLChange = (e) => this.setState({
      urlValue: e.target.value
    });
    this.confirmLink = this._confirmLink.bind(this);
    this.cancelLink = this._cancelLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);

    this.state = {
      urlValue: props.currentUrl || 'http://www.'
    };
  }

  componentDidMount() {
    this._input.focus();
  }

  _confirmLink() {
    const { urlValue } = this.state;
    const linkEntity = null;
    if (urlValue && urlValue !== '') {
      this.props.onConfirm(urlValue);
    } else {
      this.props.onCancel();
    }
  }

  _cancelLink() {
    this.props.onCancel();
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      // push enter key
      this.confirmLink();
    }
  }

  render() {
    return (
      <div style={ styles.urlInputContainer }>
      <input
        onChange={ this.onURLChange }
        ref={ (c) => this._input = c } // eslint-disable-line
        style={ styles.urlInput }
        type="text"
        value={ this.state.urlValue }
        onKeyDown={ this.onLinkInputKeyDown }
      />
      <StyleButton
        key="Confirm"
        activ
        label="Confirm"
        onToggle={ this.confirmLink }
        style
      />
      <StyleButton
        key="Cancel"
        active
        label="Cancel"
        onToggle={ this.cancelLink }
        style
      />
  </div>
    );
  }
}

UrlInputField.propTypes = {
  currentUrl: React.PropTypes.string,
  onConfirm: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
};

const styles = {
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3
  }
};


export default UrlInputField;
