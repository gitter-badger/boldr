import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchArticles } from 'app/state/article/article.actions';
import Article from './Article';
import { LayoutContainer, LayoutRow } from 'shared/index';

class BlogContainer extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(fetchArticles());
  }

  constructor(props) {
    super(props);
    this.createArticleList = (articleList) => this._createArticleList(articleList);
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }

  _createArticleList(articles) {
    const articleList = [];
    for (let article of articles) { // eslint-disable-line
      articleList.push(
        <LayoutRow key={ article.id }>
          <Article { ...article } />
        </LayoutRow>
      );
    }
    return articleList;
  }
  render() {
    let articleList = this.createArticleList(this.props.article.articles);

    return (
      <div>
      <Helmet title="Blog" />
        <LayoutContainer>
           { articleList }
        </LayoutContainer>
      </div>
      );
  }
}

BlogContainer.propTypes = {
  loading: PropTypes.bool,
  article: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  article: state.article,
  loading: state.article.loading
});

export default connect(mapStateToProps, null)(BlogContainer);
