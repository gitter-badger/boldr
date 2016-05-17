# 0.1.0-alpha.1.3 (05/15/2016)

#### Breaking Changes

- **Redis:** Removed usage of Redis for session storage. Switched to RethinkDB using [koa-resession](https://www.npmjs.com/package/koa-resession) in order to keep reliance on outside  
sources at a minimum.

#### Bugs Fixed
- **File Uploading:** Uploading a file no longer causes it to lose its extension.

#### New Additions
- Added quite a few API endpoints and basic CRUD functionality to go along with them. These include  
uploads, role, collection, page, menu and setting. Most of the corresponding dashboard areas have
also been created.

#### ToDo
- Associate Tags with an Article.
- Create settings for the user to modify.
- Implementation of role based access control.
- Flow Typing?


# 0.1.0-alpha.1 (05/08/2016)

#### Breaking Changes

- **RethinkDB:** Migrated from Postgres to RethinkDB successfully.
- **Posts renamed to Articles:** Rather than using a REST verb, it makes more sense to refer to blog posts, news posts, what-have-you as articles.

#### Bugs Fixed
- **Articles populate:** Articles now populate within the dashboard correctly.
- **User correctly decoded:** User information is now correctly decoding, and associating itself when called to bind some model to a specific user.


#### ToDo
- Improve Webpack build speed
- Associate Tags with an Article.
- Create settings for the user to modify.
