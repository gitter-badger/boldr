import React from 'react';

export default function Post(props) {
  return (
    <div className="post">
    { props.posts.map(
      (post) => {
        return (
          <div key={ `key-${post.slug}` }>
            <div className="post-preview">
            <div className="post-img">
              <img src={ post.image } />
            </div>
              <h2 className="post-title">
               { post.title }
              </h2>
              <div className="post-content">
              <p> { post.content }
                {/* When not creating BS content from the API, the markup and content would be the same */}
                {/* Meaning we will not render the content unless necessary */}
                <span dangerouslySetInnerHTML={ { __html: post.markup } } />
              </p>
              </div>
              {/* NOTE we need to fetch the author info in another call or tack it onto this initial req */}
              <p className="post-meta">Posted by { post.author_id }</p>
            </div>
            </div>
        );
      })
    }
    <hr/>
    </div>
  );
}
