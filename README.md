
<p align="center"><img src="/docs/assets/boldr-text-logo.png" width="200"></p>


[![Build Status](https://drone.boldr.io/api/badges/strues/boldr/status.svg)](https://drone.boldr.io/strues/boldr) [![Build Status](https://travis-ci.org/strues/boldr.svg?branch=master)](https://travis-ci.org/strues/boldr) [![Code Climate](https://codeclimate.com/github/strues/boldr/badges/gpa.svg)](https://codeclimate.com/github/strues/boldr)   [![codecov](https://codecov.io/gh/strues/boldr/branch/master/graph/badge.svg)](https://codecov.io/gh/strues/boldr)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  


-------    

[![Join the chat at https://gitter.im/getboldr/Lobby](https://badges.gitter.im/getboldr/Lobby.svg)](https://gitter.im/getboldr/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**Boldr** is a modern content management framework.

Think of Boldr as the solid foundation for building your next great web application. Unlike most other CMS platforms, Boldr is entirely JavaScript. Boldr features Universal / Isomorphic rendering for improved performance and Search Engine Optimization.


#### Incoming 💥  Breaking  💥  Changes and Major Improvements

Pardon the mess while things get resettled over the next 24 hours in the next and dev branches.


**Have questions or want to help with development?**
Come visit with us [![Join the chat at https://gitter.im/boldr/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/boldr/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Table of Contents
- [Boldr Repositories](#boldr-repositories)
- [Current Features](#current-features)
- [Technology Stack](#core-technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Documentation](https://docs.boldr.io)
- [Demo](#demo)
- [Contributing](#contributing)
- [Screenshots](#screenshots)


## Boldr Repositories

- [Boldr API](https://github.com/boldr/boldr-api)
- [Boldr UI](https://github.com/boldr/boldr-ui)
- [Boldr Tools](https://github.com/boldr/boldr-tools)


## Current Features

* Standalone REST API - Giving you the freedom to do whatever you'd like without looking at an interface.
* Rich Text Editor / WYSIWYG
* Server side rendering
* Authentication with JSON Web Tokens
* Content tagging - Easily relate content to similar topics
* Drag and drop file uploading
* User management with basic role based access control (major expansion of capabilities planned for a later date)
* Basic user and author profiles.
* Redis caching
* Command line interface - Quick and easy project bootstrapping


## Technology Stack

- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [Postgres](https://github.com/postgres/postgres) ([Knex](http://knexjs.org/) & [Objection](https://github.com/Vincit/objection.js/))
- [Redis](http://redis.io/)
- [Docker](https://github.com/docker/docker)
- [Webpack](https://github.com/webpack/webpack)

## Getting Started

**Development Disclaimer:** At the moment, Boldr is in active development. Meaning there might be the occasional breaking changes, and architectural adjustments.

That said, I'm confident the majority of large breaking changes is behind us.

**Step 1**
First you must somehow get the files to your machine. Below outlines two options. Using the CLI is recommended. Boldr relies on an API in order to get its data. Running Boldr's API, at least until you get a grasp on how everything works together, will provide the best possible experience.


**Using Boldr-CLI:**  

```shell
   yarn global --add boldr-cli
   boldr-cli init
   cd boldr-cms
   yarn
```  

**Using git:**  

```shell
  git clone git@github.com:strues/boldr.git <DIR_NAME>
  cd <DIR_NAME>
  yarn
```  

If you don't feel like installing a global CLI, but still want to use the API, grab the files from https://github.com/boldr/boldr-api


## Usage

Boldr runs on the following ports:
**Frontend**: 3000 - _React SSR server_  
**Webpack**: 3001 - _dev only_  



### Development


Run the CMS using `npm run dev`

After Boldr has started visit <http://localhost:3000>. If you're using the API, an admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password

Settings for the build process are located in `config/values.js`.

### Production

See the [production docs](docs/production.md)


## Demo

Visit [https://staging.boldr.io](https://staging.boldr.io) and explore the current demo deployment

> Email - admin@boldr.io<br>
> Password - password

## Contributing

Looking for an open source project to contribute to? All types of contributions are welcome here. Take a look at some of the [current issues](https://github.com/strues/boldr/issues) and see if you find something you'd like to help out with. Feel free to submit pull requests to the develop branch.

**Contribution Area Ideas**

- Documentation
- Designs
- React
- Node
- Build / Installation
- Play a major role in a community driven project, have some fun, and work on improving your skills.


## Screenshots  
|         |            |   |
| ------------- |:-------------:| -----:|
![createPost][createPostImg] | ![uploadMedia][uploadMediaImg]  | ![single][blogSingle]




[cc-img]: https://codeclimate.com/github/strues/boldr/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/strues/boldr

[coverage-link]: https://codeclimate.com/github/strues/boldr/coverage
[coverage-img]: https://codeclimate.com/github/strues/boldr/badges/coverage.svg

[createPostImg]: /docs/assets/create-post.png
[uploadMediaImg]: /docs/assets/upload-media.png
[blogSingle]: /docs/assets/create-post.png
