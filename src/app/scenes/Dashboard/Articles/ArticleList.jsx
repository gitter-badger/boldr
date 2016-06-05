import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from 'state/article/article.actions';
import Loader from 'components/Loader';
import Article from './components/Article';
import Paper from 'material-ui/Paper';
class ArticleList extends Component {
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
        <div key={ article.id }>
          <Article {...article} />
        </div>
      );
    }
    return articleList;
  }
  render() {
    const { loading, article } = this.props;
    let articleList = this.createArticleList(this.props.article.articles);

    return (
      <div>

       <Paper zDepth={ 2 }>
         { articleList }
       </Paper>
      </div>
      );
  }
}

ArticleList.propTypes = {
  loading: PropTypes.bool,
  article: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  article: state.article,
  loading: state.article.loading
});

export default connect(mapStateToProps, null)(ArticleList);
