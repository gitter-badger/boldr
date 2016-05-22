import React from 'react';
import { styleMap, articleTypes } from '../utilities';

class MoreInfo extends React.Component {

  render() {
    //TODO fix automatic extra line creation: https://github.com/facebook/draft-js/issues/327
    const moreInfo = <a href={this.context.articleUrl} style={styleMap.LINK}>{this.props.text}
        </a>;

    if (this.context.articleState === articleTypes.EDIT) {
      return (
        <div>
                    {moreInfo}
                    <div className="divider"/>
                    <div style={styleMap.DESCRIPTION}>Style map?</div>
                    <div className="divider"/>
                </div>
      )
    } else if (this.context.articleState === articleTypes.FULL) {
      return <div/>;
    } else if (this.context.articleState === articleTypes.OVERVIEW) {
      return moreInfo
    }
  }
}

MoreInfo.contextTypes = {
  articleState: React.PropTypes.string,
  articleUrl: React.PropTypes.string
};

MoreInfo.propTypes = {
  text: React.PropTypes.string.isRequired
};
export default MoreInfo;
