import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import BoldrEditor from 'shared/components/org.BoldrEditor';

class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    // this.onChange = (value) => {
    //   this.setState({
    //     value
    //   });
    // };

    this.getMarkup = (markup) => {
      this.setState({
        markup
      });
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.renderInnerMarkup = () => this._renderInnerMarkup();
    this.renderReturnedContent = (value) => this._renderReturnedContent(value);
  }
  render() {
    return (
      <div>
        Editor
        <BoldrEditor editorState={ this.state.editorState }
          onChange={ this.onChange }
        />
      </div>
    );
  }
}

export default ArticleEditor;
