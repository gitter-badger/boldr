boldr
====
[![Circle CI](https://circleci.com/gh/strues/boldr.svg?style=svg)](https://circleci.com/gh/strues/boldr)
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]

> Your dreams are bold. Your thoughts are bold. So why shouldn't your CMS be a little, **Boldr**?

## Tech Stack

* Node.js
* Koa2
* Postgres
* React

## Getting Started
The first thing you'll want to do is double check your version of Node.js. Boldr requires at least version 4.

```bash
$ npm install
```

Rename `example.env` to `.env`  and modify the values to match your environment.

#### Starting the Postgres Docker container
Running Postgres from a Docker container is simple and saves you from installing Postgres on your own computer.

`docker-compose build`  
`docker-compose up -d`

Find the IP of your Docker Machine by executing `docker-machine ip $DOCKER_VM`.

#### Setting up the Database
Run either `npm run migrate` or `npm run seed` depending on if you would like data to be automatically inserted into the database or just the tables set up.

## Usage
--------

#### Development

```bash
$ npm start
```

#### Production
> No way. Not yet.


## Road Map


## Contribute


[david-badge]: http://img.shields.io/david/strues/boldr.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/strues/boldr.svg?style=flat

[david]: https://david-dm.org/strues/boldr
[david-dev]: https://david-dm.org/strues/boldr#info=devDependencies
