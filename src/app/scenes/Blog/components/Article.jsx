import React from 'react';

export default function Article(props) {
  return (
    <div className="post">
    { props.articles.map(
      article => {
        return (
          <div key={ `key-${article.slug}` }>
            <div className="post-preview">
            <div className="post-img">
              <img src={ article.featureImage } />
            </div>
              <h2 className="post-title">
               { article.title }
              </h2>
              <div className="post-content">
              <p> { article.content }
                {/* When not creating BS content from the API, the markup and content would be the same */}
                {/* Meaning we will not render the content unless necessary */}
                <span dangerouslySetInnerHTML={ { __html: article.markup } } />
              </p>
              </div>
              {/* NOTE: we need to fetch the author info in another call or tack it onto this initial req */}
              <p className="post-meta">Posted by { article.authorId }</p>
            </div>
            </div>
        );
      })
    }
    <hr />
    </div>
  );
}

Article.propTypes = {
  articles: React.PropTypes.array
};
