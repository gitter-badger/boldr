# Directory Structure

```
.
├── Changelog.md
├── Dockerfile
├── README.md
├── boldr.paw
├── compiler.js
├── docker-compose.yml
├── docs
│   ├── api
│   │   ├── apidocs.md
│   │   ├── article
│   │   │   ├── createArticle.md
│   │   │   ├── getArticleBySlug.md
│   │   │   └── getArticles.md
│   │   ├── auth
│   │   │   ├── loginUser.md
│   │   │   └── registerUser.md
│   │   ├── tag
│   │   │   └── createTag.md
│   │   └── user
│   │       ├── getByUsername.md
│   │       ├── getUserById.md
│   │       └── getUsers.md
│   ├── logs
│   │   ├── all.log
│   │   └── rethinkdb
│   └── server.log
├── example.env
├── nodemon.json
├── package.json
├── src
│   ├── app
│   │   ├── client.jsx
│   │   ├── components
│   │   │   ├── 404
│   │   │   │   ├── 404.jsx
│   │   │   │   └── index.js
│   │   │   ├── AppDrawer
│   │   │   │   ├── AppDrawer.jsx
│   │   │   │   └── index.js
│   │   │   ├── Editor
│   │   │   │   ├── BlockControls.jsx
│   │   │   │   ├── BoldrEditor.jsx
│   │   │   │   ├── Editor.jsx
│   │   │   │   ├── Editor.scss
│   │   │   │   ├── EditorContent.jsx
│   │   │   │   ├── InlineControls.jsx
│   │   │   │   ├── SaveDraftButton.jsx
│   │   │   │   ├── StyleButton.jsx
│   │   │   │   ├── atomicBlocks
│   │   │   │   │   ├── atomicBlockTypes.js
│   │   │   │   │   ├── media.js
│   │   │   │   │   └── moreInfo.jsx
│   │   │   │   ├── header
│   │   │   │   │   ├── BlockTypes.jsx
│   │   │   │   │   ├── EditorHeader.jsx
│   │   │   │   │   ├── InlineStyleTypes.jsx
│   │   │   │   │   ├── StyleButton.jsx
│   │   │   │   │   └── controls
│   │   │   │   │       ├── BlockStyleHeaderControls.jsx
│   │   │   │   │       ├── InlineStyleHeaderControls.jsx
│   │   │   │   │       ├── LinkHeaderControls.jsx
│   │   │   │   │       ├── MediaHeaderControls.jsx
│   │   │   │   │       └── UrlInputField.jsx
│   │   │   │   ├── helpers
│   │   │   │   │   ├── applyInlineStyles.js
│   │   │   │   │   ├── articleOverviewParser.jsx
│   │   │   │   │   ├── convertEditorState.js
│   │   │   │   │   ├── draftToHtml.js
│   │   │   │   │   ├── elemental.js
│   │   │   │   │   ├── link.jsx
│   │   │   │   │   └── linkDecorator.jsx
│   │   │   │   ├── index.js
│   │   │   │   ├── styles.js
│   │   │   │   └── utilities.js
│   │   │   ├── Loader
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── index.js
│   │   │   ├── NavLink
│   │   │   │   ├── NavLink.jsx
│   │   │   │   └── index.js
│   │   │   ├── SiteLogo
│   │   │   │   ├── SiteLogo.jsx
│   │   │   │   └── index.js
│   │   │   ├── TopBar
│   │   │   │   ├── TopBar.jsx
│   │   │   │   └── index.js
│   │   │   ├── WrapTransitions
│   │   │   │   ├── WrapTransitions.jsx
│   │   │   │   └── index.js
│   │   │   └── nav-link.jsx
│   │   ├── core
│   │   │   ├── Html
│   │   │   │   ├── Html.jsx
│   │   │   │   └── index.js
│   │   │   ├── api
│   │   │   │   ├── articleEndpoint.js
│   │   │   │   └── index.js
│   │   │   ├── routes
│   │   │   │   ├── dashboard.routes.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── store
│   │   │   │   ├── configureStore.js
│   │   │   │   └── index.js
│   │   │   └── util
│   │   │       ├── checkResponseStatus.js
│   │   │       ├── index.js
│   │   │       ├── preRenderMiddleware.js
│   │   │       └── promiseMiddleware.js
│   │   ├── layouts
│   │   │   ├── CoreLayout
│   │   │   │   ├── CoreLayout.jsx
│   │   │   │   └── index.js
│   │   │   └── DashboardLayout
│   │   │       ├── DashboardLayout.jsx
│   │   │       └── index.js
│   │   ├── scenes
│   │   │   ├── Auth
│   │   │   │   ├── Login
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   ├── LoginContainer.jsx
│   │   │   │   │   └── LoginForm.jsx
│   │   │   │   ├── Register
│   │   │   │   │   ├── Register.jsx
│   │   │   │   │   ├── RegisterContainer.jsx
│   │   │   │   │   └── RegisterForm.jsx
│   │   │   │   └── index.js
│   │   │   ├── Blog
│   │   │   │   ├── Article.jsx
│   │   │   │   ├── BlogContainer.jsx
│   │   │   │   └── index.js
│   │   │   ├── Dashboard
│   │   │   │   ├── Articles
│   │   │   │   │   ├── ArticleList.jsx
│   │   │   │   │   ├── ArticlesContainer.jsx
│   │   │   │   │   ├── CreateArticle.jsx
│   │   │   │   │   └── components
│   │   │   │   │       ├── Article.jsx
│   │   │   │   │       ├── NewArticleForm.jsx
│   │   │   │   │       └── index.js
│   │   │   │   ├── Collections
│   │   │   │   │   ├── Collections.jsx
│   │   │   │   │   ├── CollectionsContainer.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Components
│   │   │   │   ├── DashboardContainer.jsx
│   │   │   │   ├── Pages
│   │   │   │   │   ├── Pages.jsx
│   │   │   │   │   ├── PagesContainer.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Settings
│   │   │   │   │   ├── Settings.jsx
│   │   │   │   │   ├── SettingsContainer.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Uploader
│   │   │   │   │   ├── Uploader.jsx
│   │   │   │   │   ├── UploaderContainer.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Users
│   │   │   │   │   ├── User.jsx
│   │   │   │   │   ├── Users.jsx
│   │   │   │   │   ├── UsersContainer.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── Home
│   │   │       ├── HomeContainer.jsx
│   │   │       └── index.js
│   │   ├── state
│   │   │   ├── article
│   │   │   │   ├── article.actions.js
│   │   │   │   ├── article.constants.js
│   │   │   │   └── article.reducer.js
│   │   │   ├── auth
│   │   │   │   ├── auth.actions.js
│   │   │   │   ├── auth.constants.js
│   │   │   │   └── auth.reducer.js
│   │   │   ├── boldr
│   │   │   │   ├── boldr.actions.js
│   │   │   │   ├── boldr.constants.js
│   │   │   │   └── boldr.reducer.js
│   │   │   ├── collection
│   │   │   │   ├── collection.actions.js
│   │   │   │   ├── collection.constants.js
│   │   │   │   └── collection.reducer.js
│   │   │   ├── index.js
│   │   │   ├── role
│   │   │   │   ├── role.actions.js
│   │   │   │   ├── role.constants.js
│   │   │   │   └── role.reducer.js
│   │   │   ├── setting
│   │   │   │   ├── setting.actions.js
│   │   │   │   ├── setting.constants.js
│   │   │   │   └── setting.reducer.js
│   │   │   └── user
│   │   │       ├── user.actions.js
│   │   │       ├── user.constants.js
│   │   │       └── user.reducer.js
│   │   └── styles
│   │       ├── abstracts
│   │       │   ├── functions.scss
│   │       │   ├── mixins.scss
│   │       │   └── variables.scss
│   │       ├── app.scss
│   │       ├── base
│   │       │   ├── base.scss
│   │       │   ├── helpers.scss
│   │       │   └── typography.scss
│   │       ├── components
│   │       │   ├── post-editor.scss
│   │       │   └── topbar.scss
│   │       ├── layout
│   │       │   └── grid.scss
│   │       ├── utils
│   │       ├── variables.scss
│   │       └── vendor
│   │           └── animate.scss
│   └── server
│       ├── api
│       │   ├── article
│       │   │   ├── article-test.js
│       │   │   ├── article.controller.js
│       │   │   └── article.router.js
│       │   ├── auth
│       │   │   ├── auth-test.js
│       │   │   ├── auth.controller.js
│       │   │   └── auth.router.js
│       │   ├── collection
│       │   │   ├── collection-test.js
│       │   │   ├── collection.controller.js
│       │   │   └── collection.router.js
│       │   ├── index.js
│       │   ├── menu
│       │   │   ├── menu-test.js
│       │   │   ├── menu.controller.js
│       │   │   └── menu.router.js
│       │   ├── page
│       │   │   ├── page-test.js
│       │   │   ├── page.controller.js
│       │   │   └── page.router.js
│       │   ├── role
│       │   │   ├── role-test.js
│       │   │   ├── role.controller.js
│       │   │   ├── role.router.js
│       │   │   └── role.schema.js
│       │   ├── setting
│       │   │   ├── setting-test.js
│       │   │   ├── setting.controller.js
│       │   │   └── setting.router.js
│       │   ├── tag
│       │   │   ├── tag.controller.js
│       │   │   ├── tag.router.js
│       │   │   └── tag.schema.js
│       │   ├── upload
│       │   │   ├── upload.controller.js
│       │   │   └── upload.router.js
│       │   ├── user
│       │   │   ├── user-test.js
│       │   │   ├── user.controller.js
│       │   │   ├── user.router.js
│       │   │   └── user.schema.js
│       │   └── version
│       │       ├── version-test.js
│       │       └── version.router.js
│       ├── auth
│       │   ├── ensureLoggedIn.js
│       │   ├── generateToken.js
│       │   ├── index.js
│       │   ├── jwtCookie.js
│       │   ├── policy
│       │   │   ├── ifRole.js
│       │   │   ├── index.js
│       │   │   └── isRole.js
│       │   └── strategies
│       │       ├── email.js
│       │       └── jwt.js
│       ├── db
│       │   ├── dbConfig.js
│       │   └── index.js
│       ├── index.js
│       ├── lib
│       │   └── socket
│       │       ├── index.js
│       │       └── rethinkdbSocket.js
│       ├── middleware
│       │   ├── bodyParser.js
│       │   ├── handleError.js
│       │   ├── index.js
│       │   ├── jwt.js
│       │   ├── responseCalls.js
│       │   └── session.js
│       ├── server.js
│       ├── server.prod.js
│       └── utils
│           ├── index.js
│           ├── logger.js
│           ├── mailer.js
│           ├── problem.js
│           └── renderReact.js
├── static
│   └── favicon.ico
├── tests.webpack.js
├── tools
│   ├── config
│   │   ├── index.js
│   │   ├── karma.conf.js
│   │   └── paths.js
│   ├── docker
│   │   └── rethinkdb
│   │       ├── Dockerfile
│   │       └── clean.sh
│   ├── scripts
│   │   ├── args.js
│   │   ├── dbTables.js
│   │   ├── setupDB.babel.js
│   │   ├── setupDB.js
│   │   └── updateDeps.sh
│   └── webpack
│       ├── dev.config.js
│       ├── dev.server.js
│       ├── isomorphic.tools.config.js
│       ├── middleware
│       │   ├── webpack-dev.js
│       │   └── webpack-hot.js
│       └── prod.config.js
├── uploads
└── webpack-assets.json
```
