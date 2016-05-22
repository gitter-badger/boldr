import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from 'app/state/modules/article/article.actions';
import Loader from '../../components/Loader';
import Article from './components/Article';

class BlogContainer extends Component {
  constructor(props) {
    super(props);
    // this.createArticleList = (articleList) => this._createArticleList(articleList);
  }
  static loadAsyncData(dispatch) {
    return dispatch(fetchArticles());
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  //
  // _createArticleList(articles) {
  //   let articleList = [];
  //   for (var article of articles) {
  //     articleList.push(
  //       <div key={article.articleId}>
  //               <Article
  //       blockStyleFn={this.blockStyleFn}
  //       blockRendererFn={this.blockRendererFn}
  //       customStyleMap={this.customStyleMap}
  //       rawDraft={article.content}
  //       articleUrl={article.slug}
  //       />
  //               <div className="section"/>
  //           </div>
  //     )
  //   }
  //   return articleList;
  // }
  render() {
    const {loading, article} = this.props;
    // let articleList = this.createArticleList(this.props.article.articles);

    return (
      <div>

       <div className="container">
         BlogContainer?

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

export default connect(mapStateToProps, null)(BlogContainer);
