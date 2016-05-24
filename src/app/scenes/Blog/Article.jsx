import React from 'react';
import Display from 'app/components/Editor/Display';
import { createEditorStateFromRawDraft } from 'app/components/Editor/helpers/convertEditorState';
import _ from 'lodash';
import { articleTypes } from 'app/components/Editor/utilities';
import { Editor, EditorState } from 'draft-js';
class Article extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorStateFromRawDraft(this.prepareDraft(props.content))
    };
    this.getChildContext = () => {
      return {
        articleState: articleTypes.FULL,
        articleUrl: this.props.articleUrl
      };
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.content !== this.props.content) {
      this.setState({
        editorState: createEditorStateFromRawDraft(
          this.prepareDraft(newProps.content)
        )
      });
    }
  }

  prepareDraft(draft) {
    return draft;
  }

  render() {
    const { editorState } = this.state;

    const { blockStyleFn } = this.props;
    const { blockRendererFn } = this.props;
    const { customStyleMap } = this.props;

    let className = 'card RichEditor-content';

    let titleHeader;
    if (this.props.title) {
      titleHeader = <h4 className="header"> { this.props.title } </h4>;
    }

    return (
      <div>
                { titleHeader }
                <div className={ className }>
                    <div className="card-content">
                    <Editor
                        blockStyleFn={blockStyleFn}
                        blockRendererFn={blockRendererFn}
                        readOnly={true}
                        customStyleMap={customStyleMap}
                        editorState={editorState}
                    />
                    </div>
                </div>
            </div>
      );
  }
}

Article.childContextTypes = {
  articleState: React.PropTypes.string,
  articleUrl: React.PropTypes.string
};

Article.propTypes = {
  blockStyleFn: React.PropTypes.func.isRequired,
  blockRendererFn: React.PropTypes.func.isRequired,
  customStyleMap: React.PropTypes.object.isRequired,
  rawDraft: React.PropTypes.object.isRequired,
  articleUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
};

export default Article;
