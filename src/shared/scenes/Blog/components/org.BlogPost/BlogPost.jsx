import React, { Component } from 'react';
import { Editor } from 'draft-js';
import { Link } from 'react-router';
import Moment from 'moment';
import { articleTypes } from 'shared/components/org.BoldrEditor/utilities';
import { createEditorStateFromRawDraft } from 'shared/components/org.BoldrEditor/helpers/convertEditorState';

class BlogPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorStateFromRawDraft(this.prepareDraft(props.content))
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

    const { customStyleMap } = this.props;

    const className = 'RichEditor-content';

    let titleHeader;
    if (this.props.title) {
      titleHeader = <h1 className="header"> { this.props.title } </h1>;
    }
    const postedOn = Moment(this.props.createdAt).format('MMMM Do YYYY');
    return (
      <div>
        <h1>{ titleHeader }</h1>
        <div>
          <p>A bold cms for you?
          </p>
        </div>
        <div>
          <p>Want to contribute? Help us out!
            If you think the code on &nbsp;
            <a target="_blank" href="https://github.com/strues/boldr">this repo</a>
            &nbsp;could be improved, please create an issue&nbsp;
            <a target="_blank" href="https://github.com/strues/boldr/issues">here</a>!
          </p>
        </div>
      </div>
    );
  }
}

export default BlogPost;
