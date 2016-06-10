import React from 'react';
import _ from 'lodash';
import { Editor, EditorState } from 'draft-js';

import { articleTypes } from 'app/components/Editor/utilities';
import Display from 'app/components/Editor/Display';
import { createEditorStateFromRawDraft } from 'app/components/Editor/helpers/convertEditorState';

class Article extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorStateFromRawDraft(this.prepareDraft(props.content))
    };

    this.getChildContext = () => {
      return {
        articleState: articleTypes.FULL,
        slug: this.props.slug
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

    const { customStyleMap, content, title, slug } = this.props;

    let className = 'RichEditor-content';

    let titleHeader;
    if (this.props.title) {
      titleHeader = <h4 className="header"> { this.props.title } </h4>;
    }

    return (
      <div>
          <div className={ className }>
              <Editor readOnly
                customStyleMap={ customStyleMap }
                editorState={ editorState }
              />
            </div>
        </div>
      );
  }
}

Article.childContextTypes = {
  articleState: React.PropTypes.string,
  slug: React.PropTypes.string
};

Article.propTypes = {
  content: React.PropTypes.object.isRequired,
  customStyleMap: React.PropTypes.object,
  slug: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  Tags: React.PropTypes.array
};

export default Article;
