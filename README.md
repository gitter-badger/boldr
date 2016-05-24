boldr
====
[![Build Status][build-badge]][travis]
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]

> Your dreams are bold. Your thoughts are bold. So why shouldn't your CMS be a little, **Boldr**?

## Tech Stack

* Node
* [Koa v2](http://koajs.com/)
* [React](http://facebook.github.io/react/)
* [RethinkDB](http://rethinkdb.com)

## Getting Started
The first thing you'll want to do is double check your version of Node.js. Boldr requires at least version 4.

```bash
$ node -v
$ git clone git@github.com:strues/boldr.git
$ npm install
```

Rename `example.env` to `.env`  and modify the values to match your environment.

#### Starting the RethinkDB :whale: container
Running RethinkDB from a Docker container is simple and saves you from installing RethinkDB on your own computer for development.

`docker-compose up -d`

Find the IP of your Docker Machine by executing `docker-machine ip $DOCKER_VM`.  

**If Docker isnt your thing**, you can install RethinkDB from homebrew or download it from their website.

## Usage
--------
#### API Documentation
[View Here](docs/api/apidocs.md)  

#### Development

```bash
$ npm start
```

#### Production
> No way. Not yet.

## Immediate ToDos
  [-] Finish implementing article tagging.  
  [-] Frontend create article  
  [-] Unique validation for articles and users.

## Road Map to Release
  [-] Setup CI testing RethinkDB container.  
  [-] Media uploading - S3 or local file system.  
  [-] Role based access control.  
  [-] Site settings  
  [-] Menu builder  
  [-] GraphQL  
  [-] Page builder  

## Contribute

## Structure
[View Here](docs/structure.md)

## Change Log
[View Here](docs/Changelog.md)
[build-badge]: http://img.shields.io/travis/strues/boldr.svg?branch=master&style=flat
[david-badge]: http://img.shields.io/david/strues/boldr.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/strues/boldr.svg?style=flat
[travis]: https://travis-ci.org/strues/boldr
[david]: https://david-dm.org/strues/boldr
[david-dev]: https://david-dm.org/strues/boldr#info=devDependencies
