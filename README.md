boldr
====
[![Circle CI](https://circleci.com/gh/strues/boldr.svg?style=svg)](https://circleci.com/gh/strues/boldr)
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]

> Your dreams are bold. Your thoughts are bold. So why shouldn't your CMS be a little, **Boldr**?

## Tech Stack

* Node
* Koa v2
* React
* RethinkDB

## Getting Started
The first thing you'll want to do is double check your version of Node.js. Boldr requires at least version 4.

```bash
$ npm install
```

Rename `example.env` to `.env`  and modify the values to match your environment.

#### Starting the RethinkDB Docker container
Running RethinkDB from a Docker container is simple and saves you from installing RethinkDB on your own computer.

`docker-compose build`  
`docker-compose up -d`

Find the IP of your Docker Machine by executing `docker-machine ip $DOCKER_VM`.

## Usage
--------

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

## Change Log
[View Here](Changelog.md)

[david-badge]: http://img.shields.io/david/strues/boldr.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/strues/boldr.svg?style=flat

[david]: https://david-dm.org/strues/boldr
[david-dev]: https://david-dm.org/strues/boldr#info=devDependencies
