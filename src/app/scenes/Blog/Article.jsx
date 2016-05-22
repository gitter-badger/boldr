import React from 'react';
import { Editor, EditorState } from 'draft-js';
// import { createEditorStateFromRawDraft } from 'app/components/Editor/helpers/convertEditorState';.
import _ from 'lodash';
// import { articleTypes } from 'app/components/Editor/utilities';

class Article extends React.Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   editorState: createEditorStateFromRawDraft(this.prepareDraft(props.rawDraft))
    // };
    // this.getChildContext = () => {
    //   return {
    //     articleState: articleTypes.FULL,
    //     articleUrl: this.props.articleUrl
    //   }
    // }
  }

  /** OVERWRITTEN IN ArticleOverview **/
  // prepareDraft(draft) {
  //   return draft;
  // }
  //
  // componentWillReceiveProps(newProps) {
  //   if (newProps.rawDraft !== this.props.rawDraft) {
  //     this.setState({
  //       editorState: createEditorStateFromRawDraft(
  //         this.prepareDraft(newProps.rawDraft)
  //       )
  //     });
  //   }
  //
  //
  // }

  render() {
    const {editorState} = this.state;

    const {blockStyleFn} = this.props;
    const {blockRendererFn} = this.props;
    const {customStyleMap} = this.props;

    let className = 'card RichEditor-content';

    let titleHeader;
    if (this.props.title) {
      titleHeader = <h4 className="header"> {this.props.title} </h4>
    }

    return (
      <div>
                {titleHeader}
                <div className={className}>
                    <div className="card-content">

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
