import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { Link } from 'react-router';
import Moment from 'moment';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Label from 'material-ui/svg-icons/action/label-outline';
import Calendar from 'material-ui/svg-icons/action/date-range';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import Display from 'components/Editor/Display';
import { articleTypes } from 'components/Editor/utilities';
import { createEditorStateFromRawDraft } from 'components/Editor/helpers/convertEditorState';
import Tag from 'shared/atm.Tag';
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
// { tag.ArticlesTags.tagId }
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
      titleHeader = <h1 className="header"> { this.props.title } </h1>;
    }
    const postedOn = Moment(this.props.createdAt).format('MMMM Do YYYY');
    return (
      <div className="col-xs-12">
      <Paper className="card" zDepth={ 2 }>
        { titleHeader }
          <div className={ className }>
            <div className="card-content">
            <Calendar /> { postedOn }
              <Editor readOnly customStyleMap={ customStyleMap } editorState={ editorState } />
              <Divider />
              <div className="row">
                <div className="col-xs">
                  <IconButton tooltip="Tags"><Label /></IconButton>
                  { this.props.Tags.map(tag => <Tag key={ tag.id } tagname={ tag.tagname } />) }
                </div>
                <div className="col-xs">
                <Link to={ `/users/${this.props.User.id}` }>
                { this.props.User.firstname } { this.props.User.lastname }</Link>
                </div>
              </div>
            </div>
          </div>
          </Paper>
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
  Tags: React.PropTypes.array,
  User: React.PropTypes.object,
  createdAt: React.PropTypes.string
};

export default Article;
