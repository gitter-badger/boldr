import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, ContentState, RichUtils, getDefaultKeyBinding,
  KeyBindingUtil, Entity, convertToRaw, CompositeDecorator, convertFromRaw,
  AtomicBlockUtils, Modifier, DefaultDraftBlockRenderMap
} from 'draft-js';
import StyleButton from './header/StyleButton';
import { BlockStyleHeaderControls } from './header/controls/BlockStyleHeaderControls';
import { InlineStyleHeaderControls } from './header/controls/InlineStyleHeaderControls';

import { stateToHTML } from 'draft-js-export-html';
import { BLOCK_TYPES } from './header/BlockTypes';
import { INLINE_STYLES } from './header/InlineStyleTypes';
import base64 from './helpers/convertBase64';
import getBoxPos from './helpers/getBoxPos';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { handleLink,
HandleLinkSpan,
findWithRegex } from './utilities';


function myKeyBindingFn(e) {
  if (e.keyCode === 69 && KeyBindingUtil.hasCommandModifier(e)) {
    return 'code-block';
  }
  return getDefaultKeyBinding(e);
}
const blockRenderMap = DefaultDraftBlockRenderMap
  .set('paragraph', {
    element: 'p'
  });

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

export default class BoldrEditor extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object,
    children: React.PropTypes.element,
    onChange: React.PropTypes.func,
    defaultContentState: React.PropTypes.object,
    readOnly: React.PropTypes.bool,
    onToggle: React.PropTypes.func
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
      editorState: EditorState.createEmpty(this.decorator)
    };
    this.onChange = (editorState) => {
      this.setState({
        editorState
      });
      const contentState = editorState.getCurrentContent();

      if (contentState.getPlainText()) {
        this.props.onChange(convertToRaw(contentState));
      } else {
        this.props.onChange(null);
      }
    };
    this.focus = () => {
      this.refs.editor.focus();
    };
  }

  componentDidMount() {
    if (this.props.defaultContentState) {
      const newRawContent = {
        ...this.props.defaultContentState,
        entityMap: {}
      };
      const newContentState = convertFromRaw(newRawContent);
      this.onChange(EditorState.createWithContent(newContentState, this.decorator));
    }
  }
  addImg(event) {
    const { editorState } = this.state;
    if (!event.target.files[0]) {
      return;
    }
    base64(event.target.files[0]).then((src) => {
      const entityKey = Entity.create('image', 'IMMUTABLE', { src });
      this.onChange(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '));
    });
  }
  addBlock(type) {
    const { editorState } = this.state;
    if (type === 'image') {
      this.refs.insertImage.click();
    } else if (type === 'line') {
      const entityKey = Entity.create(type, 'IMMUTABLE');
      this.onChange(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '));
    } else if (type === 'video') {
      const src = window.prompt('Enter a URL'); // eslint-disable-line
      if (!src) {
        return;
      }
      const entityKey = Entity.create(type, 'IMMUTABLE', { src });
      this.onChange(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '));
    }
    setTimeout(() => {
      this.setState({ boxPos: { top: getBoxPos() } });
    }, 300);
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommand(command) {
    const newState = RichUtils.toggleBlockType(this.state.editorState, command);
    this.onChange(newState);
  }

  handleTab(e) {
    e.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const targetRange = this.state.editorState.getSelection();
    const newContentState = Modifier.insertText(
      contentState,
      targetRange,
      '\t'
    );
    const editorState = EditorState.push(
      this.state.editorState,
      newContentState
    );

    this.onChange(editorState);
    this.focus();
  }

  render() {
    const { editorState, boxPos } = this.state;

    let className = !this.props.readOnly ? 'RichEditor-editor' : null;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className={ !this.props.readOnly ? 'RichEditor-root' : null }>
        { !this.props.readOnly &&
          <div>
          <Toolbar>
            <ToolbarGroup>
            <InlineStyleHeaderControls editorState={ editorState } onToggle={ ::this._toggleInlineStyle } />
            </ToolbarGroup>
            <ToolbarGroup>
              <BlockStyleHeaderControls editorState={ editorState } editorPos={ boxPos }
                addBlock={ ::this.addBlock } onToggle={ ::this._toggleBlockType }
              />
              </ToolbarGroup>
            </Toolbar>
          </div>
        }
          <div className={ className } onClick={ this.focus }>
            <Editor editorState={ editorState }
              onChange={ this.onChange }
              placeholder="Whats your story? Someone is listening"
              customStyleMap={ styleMap }
              handleKeyCommand={ ::this.handleKeyCommand }
              onTab={ ::this.handleTab }
              keyBindingFn={ myKeyBindingFn }
              blockRenderMap={ blockRenderMap }
              ref="editor"
              readOnly={ this.props.readOnly }
              contentEditable
              disableContentEditableWarning
              suppressContentEditableWarning
            />

            <input onChange={ ::this.addImg } ref="insertImage" type="file" accept="image/*" hidden="hidden" />

          </div>
      </div>
    );
  }
}

BoldrEditor.defaultProps = {
  onChange: () => {

  }
};