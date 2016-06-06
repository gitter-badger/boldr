![boldr](static/favicon-96x96.png) Boldr
====

> Your dreams are bold. Your thoughts are bold. So why shouldn't your CMS be a little, **Boldr**?


Boldr aims to provide a CMS to use as a base for your next web project. Built on cutting edge
web technologies, along with a few time tested favorites, we believe Boldr could become something
special. Of course the world doesn't need another never finished CMS project, nor does it need
the "next WordPress". Boldr tries to be none of that.
____
### Tech Stack

* Node 6
* [Koa v2](http://koajs.com/)
* [React](http://facebook.github.io/react/) 15
* Postgres 9.5  
____

### Current Version: Alpha 2
6/5/2016  

**Alpha 2** is an appropriate title for the current state of Boldr. Lots has changed since the earlier versions, which to me,
feels like a worthy bump from Alpha 1 to Alpha 2. Dont be fooled into thinking this is **anywhere close** to being ready. There
is still mountains of work to do before this is considered beta.  

### Notable changes and additions:

1. **RethinkDB was dropped for Postgres**  
  The choice was clear when work started on relations between data. RethinkDB is great and I use
it for various other projects, but relational databases do what they do so well.

2. **Redis**  
Redis via ioredis was added for session support and advanced caching.

3. **Articles**  
The ability to create articles with both tags and user relationships works

4. **Other areas**  
Work has started on the frontend for managing important aspects of websites powered by Boldr. This
includes such things as the page builder, site configuration, and the overall look and feel.
____

## Getting Started
At the moment, Boldr is in active development and not quite ready for use.

```bash
$ node -v
$ git clone git@github.com:strues/boldr.git
$ npm install
```

Rename `example.env` to `.env`  and modify the values to match your environment.

#### Development

```bash
$ npm start
```

#### Production
> No way. Not yet.

## Immediate ToDos

## Road Map to Release


## Contribute
Looking for an open source project to contribute to? We could use a hand developing Boldr.

## Documentation
#### API Documentation
[View Here](docs/api/apidocs.md)  

#### Structure
[View Here](docs/structure.md)

#### Change Log
[View Here](docs/Changelog.md)
[logo]: https://boldr.io/favicon-96x96.png "Boldr"
