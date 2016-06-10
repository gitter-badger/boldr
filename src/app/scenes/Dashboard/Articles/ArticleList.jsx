import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { lightWhite } from 'material-ui/styles/colors';
import { fetchArticles } from 'state/article/article.actions';
import Loader from 'shared/atm.Loader';
import Article from 'scenes/Dashboard/components/Article';

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
        <div>
        <ListItem key={ article.id } primaryText={ article.title }>
          <Article {...article} />
        </ListItem>
        <Divider inset />
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
      <Helmet title="Articles" />
       <Paper zDepth={ 2 }>
       <div className="col-xs-12 col-md-6 col-lg-4">
       <List>
       <Subheader>Articles</Subheader>
         { articleList }
         </List>
         </div>
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
