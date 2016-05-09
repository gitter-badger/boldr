# 0.1.0-alpha.1 (05/08/2016)

#### Breaking Changes

- **RethinkDB:** Migrated from Postgres to RethinkDB sucessfully.
- **Posts renamed to Articles:** Rather than using a REST verb, it makes more sense to refer to blog posts, news posts, what-have-you as articles.

#### Bugs Fixed
- **Articles populate:** Articles now populate within the dashboard correctly.
- **User correctly decoded:** User information is now correctly decoding, and associating itself when called to bind some model to a specific user.


#### ToDo 
- Improve Webpack build speed
- Associate Tags with an Article.
- Create settings for the user to modify.
