/* @flow */
import React, { PropTypes, Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Entity,
  convertToRaw,
  CompositeDecorator,
  convertFromRaw,
  AtomicBlockUtils,
  Modifier,
  DefaultDraftBlockRenderMap
} from 'draft-js';

import { findLinkEntities } from './utilities';
import { Link } from './components';
import actions from './actions';
import BoldrTheme from './style/BoldrTheme';
import Media from './components/org.Media';
import getBoxPos from './helpers/getBoxPos';
import Divider from 'material-ui/Divider';
import Toolbar from './components/org.Toolbar';

type Props = {
  editorState: Object,
  children: any,
  onChange: Function,
  defaultContentState: Object,
  readOnly: Boolean,
  onToggle: Function
}

const blockRenderMap = DefaultDraftBlockRenderMap.set('paragraph', { element: 'p' });
const inline = {
  editor: {
    minHeight: '400px'
  }
};

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

export default class BoldrEditor extends Component {

  constructor(props) {
    super(props);

    this.decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);
    this.state = {
      editorState: EditorState.createEmpty(this.decorator)
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });

      const contentState = editorState.getCurrentContent();

      // if (contentState.getPlainText()) {
      //   this.props.onChange(convertToRaw(contentState));
      // } else {
      //   this.props.onChange(null);
      // }
    };
    this.mediaBlockRenderer = ::this.mediaBlockRenderer;
    this.focus = () => {
      this.refs.editor.focus();
    };
    this.keyBindings = this.props.keyBindings || [];
    this.externalKeyBindings = ::this.externalKeyBindings;
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
  props: Props;
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

  externalKeyBindings(e): string {
    for (const kb of this.keyBindings) {
      if (kb.isKeyBound(e)) {
        return kb.name;
      }
    }
    return getDefaultKeyBinding(e);
  }

  handleKeyCommand(command) {
      // external key bindings
    const extKb = this.keyBindings.find(kb => kb.name === command);
    if (extKb) {
      extKb.action();
      return true;
    }

    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  }

  handleConfirmLink(e) {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    this.setState({
      editorState: RichUtils.toggleLink(
          editorState,
          editorState.getSelection(),
          entityKey
        ),
      inputtable: false,
      urlValue: ''
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  handleInputKeyDown(e) {
    if (e.which === 13) {
      this.handleConfirmLink(e);
    }
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
  mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
        props: {
          onChange: this.onChange,
          editorState: this.props.editorState,
          setReadOnly: this.setReadOnly
        }
      };
    }

    return null;
  }

  blockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'unstyled') {
      return 'paragraph';
    }
  }

  render() {
    const { editorState } = this.state;
    let className = !this.props.readOnly ? 'BoldrEditor-editor' : null;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' BoldrEditor-hidePlaceholder';
      }
    }

    return (
        <div>
          <div style={ BoldrTheme.base } className={ !this.props.readOnly ? 'BoldrEditor-root' : null } ref="editor">
            { !this.props.readOnly &&
              <Toolbar editorState={ editorState }
                editor={ this.refs.editor }
                onChange={ ::this.onChange }
                onToggle={ ::this._toggleInlineStyle }
                addBlock={ ::this.addBlock }
                onToggle={ ::this._toggleBlockType }
                actions={ actions }
              />
            }
            <Divider />

            <div className={ className } onClick={ ::this.focus }>
              <Editor editorState={ editorState }
                onChange={ this.onChange }
                blockRendererFn={ this.mediaBlockRenderer }
                blockStyleFn={ this.blockStyleFn }
                placeholder={ this.props.placeholder }
                onTab={ ::this.handleTab }
                customStyleMap={ styleMap }
                handleKeyCommand={ ::this.handleKeyCommand }
                keyBindingFn={ this.externalKeyBindings }
                blockRenderMap={ blockRenderMap }
                readOnly={ this.props.readOnly }
                contentEditable
                style={ inline.editor }
              />
            </div>
        </div>
        </div>
      );
  }
  }
