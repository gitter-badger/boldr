import React, { Component } from 'react';

import BoldrEditor from 'shared/components/org.BoldrEditor';

class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    this.onChange = (value) => {
      this.setState({
        value
      });
    };

    this.getMarkup = (markup) => {
      this.setState({
        markup
      });
    };

    this.renderInnerMarkup = () => this._renderInnerMarkup();
    this.renderReturnedContent = (value) => this._renderReturnedContent(value);

    this.state = {
    };
  }
  render() {
    return (
      <div>
        Editor
        <BoldrEditor />
      </div>
    );
  }
}

export default ArticleEditor;
