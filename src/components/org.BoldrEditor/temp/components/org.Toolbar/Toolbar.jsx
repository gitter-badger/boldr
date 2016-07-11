import React, { PropTypes, Component } from 'react';
import {
  EditorState, RichUtils, Entity, CompositeDecorator, convertFromRaw, AtomicBlockUtils
} from 'draft-js';
import classNames from 'classnames';
import { BlockStyleHeaderControls } from '../../header/controls/BlockStyleHeaderControls';
import { InlineStyleHeaderControls } from '../../header/controls/InlineStyleHeaderControls';
import LinkInput from '../atm.LinkInput';
import ToolbarItem from '../atm.ToolbarItem';
import getBoxPos from '../../helpers/getBoxPos';
import { getSelectionCoords, handleLink, HandleLinkSpan } from '../../utilities';
const inline = {
  toolbar: {
    background: 'yellow',
    height: 0,
    position: 'absolute',
    display: 'none',
    zIndex: 10
  },
  wrapper: {
    display: 'inline-block'
  },
  list: {
    padding: '0 8px',
    margin: 0,
    whiteSpace: 'nowrap',
    listStyleType: 'none',
    display: 'inline'
  },
  arrow: {
    display: 'inline-block',
    top: '100%',
    left: '50%',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderWidth: '8px',
    borderStyle: 'solid',
    borderColor: '#181818 transparent transparent',
    marginLeft: '-8px'
  }
};
class Toolbar extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    children: PropTypes.element,
    onChange: PropTypes.func,
    defaultContentState: PropTypes.object,
    readOnly: PropTypes.bool,
    onToggle: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.decorator = new CompositeDecorator([
      {
        strategy: handleLink,
        component: HandleLinkSpan
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(this.decorator),
      show: false,
      editingLink: false,
      link: ''
    };

    this.focus = () => {
      this.refs.editor.focus();
    };
    this.renderButton = ::this.renderButton;
    this.cancelLink = ::this.cancelLink;
  }

  componentDidMount() {
    if (this.props.defaultContentState) {
      const newRawContent = {
        ...this.props.defaultContentState,
        entityMap: {}
      };
      const newContentState = convertFromRaw(newRawContent);
      this.props.onChange(EditorState.createWithContent(newContentState, this.decorator));
    }
  }
  componentDidUpdate() {
    if (!this.props.editorState.getSelection().isCollapsed()) {
      return this.setBarPosition();
    } else {
      if (this.state.show) {
        this.setState({ // eslint-disable-line
          show: false,
          editingLink: false,
          link: ''
        });
      }
    }
  }
  setBarPosition() {
    const editor = this.props.editor;
    const toolbar = this.refs.toolbar;
    const selectionCoords = getSelectionCoords(editor, toolbar);

    if (!selectionCoords) {
      return null;
    }

    if (selectionCoords &&
        !this.state.position ||
        this.state.position.top !== selectionCoords.offsetTop ||
        this.state.position.left !== selectionCoords.offsetLeft) {
      this.setState({
        show: true,
        position: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft
        }
      });
    }
  }
  toggleLink() {
    if (this.hasLink()) {
      this.unlink();
    } else {
      this.setState({ editingLink: true });
    }
  }
  addBlock(type) {
    if (type === 'image') {
      this.refs.insertImage.click();
    } else if (type === 'line') {
      const entityKey = Entity.create(type, 'IMMUTABLE');
      this.props.onChange(AtomicBlockUtils.insertAtomicBlock(this.props.editorState, entityKey, ' '));
    } else if (type === 'video') {
      const src = window.prompt('Enter a URL'); // eslint-disable-line
      if (!src) {
        return;
      }
      const entityKey = Entity.create(type, 'IMMUTABLE', { src });
      this.props.onChange(AtomicBlockUtils.insertAtomicBlock(this.props.editorState, entityKey, ' '));
    }
    setTimeout(() => {
      this.setState({ boxPos: { top: getBoxPos() } });
    }, 300);
  }

  toggleBlockStyle(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  }

  toggleInlineStyle(inlineStyle) {
    const newEditorState = RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
    this.props.onChange(newEditorState);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.toggleBlockType(this.props.editorState, command);
    this.props.onChange(newState);
  }

  handleInputKeyDown(e) {
    if (e.which === 13) {
      this.handleConfirmLink(e);
    }
  }
  hasLink() {
    const selection = this.props.editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const entityKey = anchorBlock.getEntityAt(selection.anchorOffset);
    if (entityKey) {
      const entity = Entity.get(entityKey);
      if (entity.getType() === 'LINK') {
        return true;
      }
    }
    return false;
  }

  unlink() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  }

  cancelLink() {
    this.setState({
      editingLink: false
    });
  }
  renderButton(item, position) {
    let current = null;
    let toggle = null;
    let active = null;
    let key = item.label;

    switch (item.type) {
      case 'inline': {
        current = this.props.editorState.getCurrentInlineStyle();
        toggle = () => this.toggleInlineStyle(item.style);
        active = current.has(item.style);
        break;
      }
      case 'block': {
        const selection = this.props.editorState.getSelection();
        current = this.props.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        toggle = () => this.toggleBlockStyle(item.style);
        active = item.style === current;
        break;
      }
      case 'separator': {
        key = `sep-${position}`;
        break;
      }
      case 'entity': {
        toggle = () => this.toggleLink();
        active = this.hasLink();
        break;
      }
      default:
        return undefined;
    }

    return (
      <ToolbarItem style={ inline.wrapper } key={ key } active={ active } toggle={ toggle } item={ item } />
    );
  }
  render() {
    const { editorState, boxPos } = this.state;
    const toolbarClass = classNames('toolbar', {
      'toolbar--open': this.state.show,
      'toolbar--editing-link': this.state.editingLink
    });
    let className = !this.props.readOnly ? 'RichEditor-editor' : null;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div>

         <div className={ toolbarClass } style={ this.state.position } ref="toolbarWrapper">
        <div ref="toolbar">
          <ul style={ inline.list } onMouseDown={ (x) => {x.preventDefault();} }>
            { this.props.actions.map(this.renderButton) }
          </ul>
          <LinkInput
            ref="textInput"
            editorState={ this.props.editorState }
            onChange={ this.props.onChange }
            editingLink={ this.state.editingLink }
            editor={ this.props.editor }
            cancelLink={ this.cancelLink }
          />
          <span style={ inline.arrow } />
        </div>
      </div>
      </div>
    );
  }
}

export default Toolbar;
