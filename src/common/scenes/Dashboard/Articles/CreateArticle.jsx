import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { bindActionCreators } from 'redux';
import * as articleActions from 'common/state/modules/article/article.actions';
import { InlineStyleControls, BlockStyleControls, PublishingControls } from 'common/components/Editor';
import Loader from 'common/components/Loader';
import { changeArticlePublishSetting } from 'common/api/articleEndpoint';

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

class CreateArticle extends Component {
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
  }

  componentDidMount() {
    this.focus = () => this.refs.editor.focus();
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
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
        <PublishingControls
            publish={() => this.publish(this.props)}
            showPublishButton={this.props.articleId !== -1}
          />
        </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.article,
    loading: state.article.loading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    articleActions: bindActionCreators(articleActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
