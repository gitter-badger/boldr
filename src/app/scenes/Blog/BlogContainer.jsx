import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from 'app/state/modules/article/article.actions';
import Loader from '../../components/Loader';
import Article from './Article';
import ReactRethinkdb from 'react-rethinkdb';
import reactMixin from 'react-mixin';

const r = ReactRethinkdb.r;

class BlogContainer extends Component {
  constructor(props) {
    super(props);
    this.createArticleList = (articleList) => this._createArticleList(articleList);
  }
  static loadAsyncData(dispatch) {
    return dispatch(fetchArticles());
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  observe(props, state) { // eslint-disable-line no-unused-vars
    return {
      articles: new ReactRethinkdb.QueryRequest({
        query: r.table('articles'), // RethinkDB query
        changes: true, // subscribe to realtime changefeed
        initial: []
      })
    };
  }
  _createArticleList(articles) {
    let articleList = [];
    for (var article of articles) {
      articleList.push(
        <div key={article.articleUrl}>
                <Article
        blockStyleFn={this.blockStyleFn}
        blockRendererFn={this.blockRendererFn}
        customStyleMap={this.customStyleMap}
        rawDraft={article.content}
        articleUrl={article.articleUrl}
        />
                <div className="section"/>
            </div>
      )
    }
    return articleList;
  }
  render() {
    const {loading, article} = this.props;
    let articleList = this.createArticleList(this.props.article.articles);

    return (
      <div>

       <div className="container">
         BlogContainer?
          {articleList}
       </div>
      </div>
      );
  }
}

BlogContainer.propTypes = {
  loading: PropTypes.bool,
  article: PropTypes.object
};

const mapStateToProps = (state) => ({
  article: state.article,
  loading: state.article.loading
});
reactMixin.onClass(BlogContainer, ReactRethinkdb.DefaultMixin);
export default connect(mapStateToProps, null)(BlogContainer);
