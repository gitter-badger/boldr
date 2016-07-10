import { provideHooks } from 'redial';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchArticles, FETCH_ARTICLES_REQUEST } from 'state/modules/article';
import BlogPost from './components/org.BlogPost';
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchArticles())
})
class Blog extends Component {
  constructor(props) {
    super(props);
    this.createArticleList = (articleList) => this._createArticleList(articleList);
  }
  // componentDidMount() {
  //   this.props.actions.fetchArticles();
  // }

  _createArticleList(articles) {
    const articleList = [];
    for (let article of articles) { // eslint-disable-line
      articleList.push(
          <BlogPost { ...article } />
      );
    }
    return articleList;
  }
  render() {
    const articleList = this.createArticleList(this.props.article.articles);
    return (
      <div>
        Blog
        {
          this.props.article.isLoading ? <h1>Loading ...</h1> : articleList
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.article,
    isLoading: state.article.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ fetchArticles }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
