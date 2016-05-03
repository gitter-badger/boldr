import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { bindActionCreators } from 'redux';
import * as postActions from 'common/redux/modules/post/post.actions';
import { InlineStyleControls, BlockStyleControls, PublishingControls } from '../../../components/Editor';
import Loader from 'common/components/Loader';
import { changePostPublishSetting } from 'common/api/postEndpoint';
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content)); // eslint-disable-line
    };
    const title = decodeURI(window.location.pathname.split('/')[2]);

    if (title !== 'undefined') this.props.postActions.getOrFetchPost(title);

    setTimeout(() => {
      this.loadContent(props);
    }, 100);
    this.titleAutoSizer();
  }

  componentDidMount() {
    this.focus = () => this.refs.editor.focus();
  }

  componentWillReceiveProps(props) {
    this.loadContent(props);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }
  titleAutoSizer() {
    function autosize() {
      const _this = this;
      setTimeout(() => {
        _this.style.cssText = 'height: auto; padding:0';
        _this.style.cssText = `height: ${_this.scrollHeight}px`;
      }, 0);
    }

    setTimeout(() => {
      document.getElementById('title').addEventListener('keydown', autosize);
    }, 200);
  }
  loadContent(props) {
    if (props.editableBody !== '{}') {
      const content = ContentState.createFromBlockArray(
          convertFromRaw(JSON.parse(props.editableBody)));

      this.setState({
        editorState: EditorState.createWithContent(content)
      });

      setTimeout(() => {
        document.getElementById('title').value = props.title;
        document.getElementById('publish-toggle').value = props.isPublic;
      }, 1);
    }
  }
  sanitize(state, props) {
    const { editorState } = state;
    const { dispatch } = props;
    const editableContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const renderableContent = stateToHTML(editorState.getCurrentContent());

    if (props.isEditing) {
      // update post action
      dispatch(postActions.getOrFetchPost(props.postId, document.getElementById('title').value,
          document.getElementById('publish-toggle').value, renderableContent, editableContent));
    } else {
      // create post action
      dispatch(postActions.getOrFetchPost(document.getElementById('title').value,
          renderableContent, editableContent));
    }
  }

  publish(props) {
    changePostPublishSetting(props.postId, !props.isPublic);
  }

  render() {
    const { editorState } = this.state;

    let className = 'editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
        <div className="RichEditor-root">
        { this.props.loading ? <Loader /> :
          <div>
            <div>
              <BlockStyleControls
                editorState={ editorState }
                onToggle={ this.toggleBlockType }
              />
              <InlineStyleControls
                editorState={ editorState }
                onToggle={ this.toggleInlineStyle }
              />

            </div>
            <div className="title-container">
              <textarea id="title" className="title-input"
                placeholder="Every story starts with a title..."
                maxLength="120"
              >
              </textarea>
            </div>
            <div className="editor-container">
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  ref="editor"
                  placeholder="Whats your story?"
                />
              </div>
              <input onClick={this.logState} type="button" value="Console.log State" />
            </div>
          </div>
        }
        <PublishingControls
            sanitize={() => this.sanitize(this.state, this.props)}
            publish={() => this.publish(this.props)}
            showPublishButton={this.props.postId !== -1}
            loading={this.props.loading}
          />
        </div>
    );
  }
}

const getEditablePost = (state) => {
  const title = decodeURI(window.location.pathname.split('/')[2]);

  if (!title || title === 'undefined') {
    return {
      loading: false,
      isEditing: state.editPostId !== -1,
      isPublic: false,
      isWorking: false,
      postId: state.editPostId || -1,
      title: '',
      content: '',
      editableBody: '{}'
    };
  }

  const post = state.posts.filter((x) => x.title === title)[0];
  if (post) {
    return {
      loading: false,
      isEditing: true,
      isPublic: post.is_public,
      isWorking: false,
      title: post.title,
      postId: post.id,
      content: post.content,
      editableBody: post.content
    };
  }

  return {
    loading: false,
    isEditing: true,
    isPublic: false,
    isWorking: false,
    title: '',
    postId: -1,
    body: '',
    editableBody: '{}'
  };
};
const mapStateToProps = (state) => getEditablePost(state.post);
const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
