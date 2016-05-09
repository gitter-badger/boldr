import React, { Component } from 'react';
import { connect } from 'react-redux';
import { r, QueryRequest, PropsMixin as RethinkMixin } from 'react-rethinkdb';
import { fetchArticles } from 'common/state/modules/article/article.actions';
import Loader from '../../components/Loader';
import Article from '../../components/scenes/Blog';

// Data that needs to be called before rendering the component
// This is used for server side rending via the fetchComponentDataBeforeRending() method
Article.need = [
  fetchArticles
];

class BlogContainer extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(fetchArticles());
  }

  render() {
    const { loading, article } = this.props;
    const articlesMap = () => {
      return (
       <Article articles={ this.props.article.articles } />
      );
    };
    return (
      <div>

       <div className="container">
         BlogContainer?
         { loading ? <Loader /> : <Article articles={ this.props.article.articles } /> }
       </div>
      </div>
      );
  }
}
const mapStateToProps = (state) => ({
  article: state.article,
  loading: state.article.loading
});

export default connect(mapStateToProps, null)(BlogContainer);
