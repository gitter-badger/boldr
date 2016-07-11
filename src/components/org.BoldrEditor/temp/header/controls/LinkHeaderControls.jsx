import React from 'react';
import { RichUtils } from 'draft-js';
import { getCurrentUrl, createLinkEntity } from '../../helpers/linkDecorator';
import StyleButton from '../StyleButton';
import UrlInputField from './UrlInputField';

class LinkHeaderControls extends React.Component {

  constructor(props) {
    super(props);

    this.openLinkInput = this._openLinkInput.bind(this);
    this.confirmLink = (urlValue) => this._confirmLink(urlValue);
    this.cancelLink = this._cancelLink.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.collapseLinkBlock = this._collapseLinkBlock.bind(this);
    this.addLink = this._addLink.bind(this);

    this.state = {
      urlInputField: {
        isActive: false,
        type: undefined,
        urlValue: undefined
      }
    };
  }

  _openLinkInput() {
    const { editorState } = this.props;

    if (!editorState.getSelection().isCollapsed()) {
      // TODO notice that you need to select something!
      this.setState({
        urlInputField: {
          isActive: true,
          type: 'add_link',
          urlValue: getCurrentUrl(editorState)
        }
      });
    } else {
      this.collapseLinkBlock();
    }
  }

  _collapseLinkBlock() {
    this.setState({
      urlInputField: {
        isActive: false,
        type: undefined,
        urlValue: undefined
      }
    }, () => {
      setTimeout(() => this.props.onFocus(), 0);
    });
  }

  _confirmLink(urlValue) {
    if (urlValue && urlValue !== '') {
      // TODO add check if valid link!
      this.addLink(urlValue);
    }
    this.collapseLinkBlock();
  }

  _addLink(urlValue) {
    this.props.onChange(
      RichUtils.toggleLink(
        this.props.editorState,
        this.props.editorState.getSelection(),
        createLinkEntity(urlValue)
      )
    );
  }

  _cancelLink() {
    this.collapseLinkBlock();
  }

  _removeLink() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      // TODO notice that you need to select something!
      this.props.onChange(
        RichUtils.toggleLink(
          this.props.editorState,
          this.props.editorState.getSelection(),
          null
        )
      );
    }
  }

  render() {
    let urlInput;
    const { isActive, type, urlValue } = this.state.urlInputField;
    if (isActive) {
      urlInput = <UrlInputField currentUrl={ urlValue } onConfirm={ this.confirmLink } onCancel={ this.cancelLink } />;
    }

    return (
      <div>
        <StyleButton key="add_link" active={ type === 'add_link' } label="Add Link"
          onToggle={ this.openLinkInput } style
        />
        <StyleButton key="remove_link" active={ false } label="Remove Link" onToggle={ this.removeLink }
          style={ false }
        />
          { urlInput }
      </div>
    );
  }
}

LinkHeaderControls.propTypes = {
  editorState: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired
};

export default LinkHeaderControls;
