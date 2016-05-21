import Draft from 'draft-js';
import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import getUnboundedScrollPosition from 'fbjs/lib/getUnboundedScrollPosition.js';
import Style from 'fbjs/lib/Style.js';

import MediaComponent from './MediaComponent';
import insertMediaBlock from './modifiers/insertMediaBlock';
import removeMediaBlock from './modifiers/removeMediaBlock';
import SideControl from './SideControl/SideControl';
import PopoverControl from './PopoverControl/PopoverControl';
import generateUniqueType from './lib/generateUniqueType.js';
import Image from './Image.js';
import MediaWrapper from './MediaWrapper.js';

const {ContentState, Editor, EditorState, RichUtils, Entity, CompositeDecorator, convertFromRaw, convertToRaw} = Draft;


const getSelectedBlockElement = (range) => {
  let node = range.startContainer;
  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
/* const currentContent = this.state.editorState.getCurrentContent()
const selection = this.state.editorState.getSelection()
return currentContent.getBlockForKey(selection.getStartKey())*/
};

const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  return selection.getRangeAt(0);
};

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'link'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {href} = Entity.get(props.entityKey).getData();
  return (
    <a href={href} style={styles.link}>
      {props.children}
    </a>
    );
};

const styles = {
  editorContainer: {
    position: 'relative'
  // paddingLeft: 48,
  },
  popOverControl: {
    width: 78, // Height and width are needed to compute the position
    height: 24,
    display: 'none',
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 998
  },
  sideControl: {
    height: 24, // Required to figure out positioning
    // width: 48, // Needed to figure out how much to offset the sideControl left
    left: -48,
    display: 'none'
  }
};

const popoverSpacing = 3; // The distance above the selection that popover
// will display

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

export default class RichEditor extends React.Component {

  static propTypes = {
    blockTypes: React.PropTypes.object,
    readOnly: React.PropTypes.bool
  };

  static defaultProps = {
    blockTypes: {
      image: Image
    }
  };

  constructor(props) {
    super(props);

    let editorState = null;
    if (this.props.editorState) {
      editorState = this.props.editorState;
    } else if (this.props.content) {
      const blocks = convertFromRaw(this.props.content);
      editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(blocks),
        decorator
      );
    } else {
      editorState = EditorState.createEmpty(decorator);
    }

    this.state = {
      editorState,
      liveTeXEdits: Map()
    };

    this._blockRenderer = (block) => {
      const type = block.getType();

      const Component = this.props.blockTypes[type];
      if (Component) {
        return {
          component: MediaWrapper,
          props: {
            child: <Component />
          }
        };
      }
      return null;
    };

    this._focus = () => {
      if (this.props.readOnly) {
        return;
      }

      const editorNode = ReactDOM.findDOMNode(this.refs['editor']); // eslint-disable-line
      const editorBounds = editorNode.getBoundingClientRect();
      this.setState({
        editorBounds
      });

      const scrollParent = Style.getScrollParent(editorNode);
      this.refs.editor.focus(getUnboundedScrollPosition(scrollParent));
    // this.refs.editor.focus();
    };
    this._onChange = (editorState) => {
      this.setState({
        editorState
      });

      // Calling this right away doesn't always seem to be reliable. It
      // sometimes selects the first block when the user has focus on a block
      // later on in the series. Although setting the state twice is less than
      // ideal
      setTimeout(this.updateSelection, 4);

      if (this.props.onChange) {
        this.props.onChange(this.getContent());
      }
    };

    this.updateSelection = () => {
      const selectionRangeIsCollapsed = null;
      let sideControlVisible = false;
      const sideControlTop = null; // eslint-disable-line
      const sideControlLeft = styles.sideControl.left;
      let popoverControlVisible = false;
      let popoverControlTop = null;
      let popoverControlLeft = null;

      const selectionRange = getSelectionRange();
      if (selectionRange) {
        const rangeBounds = selectionRange.getBoundingClientRect();
        const selectedBlock = getSelectedBlockElement(selectionRange);
        if (selectedBlock) {
          const blockBounds = selectedBlock.getBoundingClientRect();

          sideControlVisible = true;
          // sideControlTop = this.state.selectedBlock.offsetTop
          const editorBounds = this.state.editorBounds;

          const sideControlTop = (blockBounds.top - editorBounds.top)
            + ((blockBounds.bottom - blockBounds.top) / 2)
            - (styles.sideControl.height / 2);


          if (!selectionRange.collapsed) {
            popoverControlVisible = true;
            const rangeWidth = rangeBounds.right - rangeBounds.left;
            const rangeHeight = rangeBounds.bottom - rangeBounds.top;
            const popoverControlTop = (rangeBounds.top - editorBounds.top)
              - styles.popOverControl.height
              - popoverSpacing;
            popoverControlLeft = 0
              + (rangeBounds.left - editorBounds.left)
              + (rangeWidth / 2)
              - (styles.popOverControl.width / 2);
          }
        }
      }

      this.setState({
        sideControlVisible,
        sideControlTop,
        sideControlLeft,
        popoverControlVisible,
        popoverControlTop,
        popoverControlLeft
      });
    };


    this._handleKeyCommand = command => {
      const { editorState } = this.state;
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this._onChange(newState);
        return true;
      }
      return false;
    };

    this._removeTeX = (blockKey) => {
      const { editorState, liveTeXEdits } = this.state;
      this.setState({
        liveTeXEdits: liveTeXEdits.remove(blockKey),
        editorState: removeMediaBlock(editorState, blockKey)
      });
    };
  }

  componentWillReceiveProps = (props) => {
    if (props.editorState) {
      this.setState({
        editorState: props.editorState
      });
    }
    if (props.content) {
      const blocks = convertFromRaw(props.content);
      const editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(blocks),
        decorator
      );
      this.setState({
        editorState
      });
    }
  };

  // This editor will support a real basic example of inserting an image
  // into the page, just so something works out the box.
  handleFileInput = (e) => {
    const files = Array.prototype.slice.call(e.target.files, 0);
    files.forEach(f => this.insertBlockComponent('image', {
      src: URL.createObjectURL(f)
    }));
  };

  toggleBlockType = (blockType) => {
    this.onEditorChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType));

    setTimeout(this.updateSelection, 4);
  };

  toggleInlineStyle = (style) => {
    if (style !== 'LINK') {
      return this.onEditorChange(
        RichUtils.toggleInlineStyle(this.state.editorState, style));
    }

    // Add a link
    const selection = this.state.editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    const href = window.prompt('Enter a URL'); // eslint-disable-line
    const entityKey = Entity.create('link', 'MUTABLE', {
      href
    });
    const content = this.state.editorState.getCurrentContent();
    this.onEditorChange(
      RichUtils.toggleLink(this.state.editorState, selection, entityKey));
  };

  onEditorChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  getContent = () => {
    const content = this.state.editorState.getCurrentContent();
    return convertToRaw(content);
  };

  insertBlock = (type, data) => {
    const editorState = insertMediaBlock(this.state.editorState, type, data);
    this.setState({
      editorState
    });
  };

  insertBlockComponent = (type, data) => {
    // @TODO: create a componnet pool with type
    // var type = generateUniqueType()

    const { editorState, entityKey } = insertMediaBlock(this.state.editorState, type, data);
    this.setState({
      editorState
    });
    return entityKey;
  };

  getEditorState = () => {
    return this.state.editorState;
  };

  /**
   * While editing TeX, set the Draft editor to read-only. This allows us to
   * have a textarea within the DOM.
   */
  render() {
    const editorState = this.state.editorState;
    // console.log(this.getContent())

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const selection = editorState.getSelection();
    const selectedBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const sideControlStyles = Object.assign({}, styles.sideControl);
    if (this.props.readOnly !== true && this.state.sideControlVisible) {
      sideControlStyles.display = 'block';
      sideControlStyles.top = this.state.sideControlTop;
      sideControlStyles.left = this.state.sideControlLeft;
    }

    const popoverStyles = Object.assign({}, styles.popOverControl);
    if (this.props.readOnly !== true && this.state.popoverControlVisible) {
      popoverStyles.display = 'block';
      popoverStyles.top = this.state.popoverControlTop;
      popoverStyles.left = this.state.popoverControlLeft;
    }

    return (
      <div style={Object.assign({}, styles.editorContainer, this.props.style)}
      className="TeXEditor-editor" onClick={this._focus}>
        <SideControl style={sideControlStyles}
      onImageClick={ this.props.onImageClick
      // This editor will support a real basic example of inserting an image
      // into the page, just so something works out the box.
      || ((e) => this.refs.fileInput.click()) }
      toggleBlockType={type => this.toggleBlockType(type)}
      selectedBlockType={selectedBlockType}
      />
        <PopoverControl
      style={popoverStyles}
      toggleInlineStyle={style => this.toggleInlineStyle(style)}
      currentInlineStyle={currentInlineStyle}
      />
        <Editor
      blockRendererFn={this._blockRenderer}
      editorState={this.state.editorState}
      handleKeyCommand={this._handleKeyCommand}
      onChange={this._onChange}
      placeholder={this.props.placeholder}
      readOnly={this.props.readOnly}
      ref="editor"
      spellCheck={true}

      />
        <input type="file" ref="fileInput" style={{
        display: 'none'
      }}
      onChange={ this.handleFileInput } />
      </div>

      );
  }
}
