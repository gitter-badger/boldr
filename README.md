![boldr](static/favicon-96x96.png) Boldr
====

> Your dreams are bold. Your thoughts are bold. So why shouldn't your CMS be a little, **Boldr**?


Boldr aims to provide a CMS to use as a base for your next web project. Built on cutting edge web technologies, along with a few time tested favorites, we believe Boldr could become something special. Of course the world doesn't need another never finished CMS project, nor does it need the "next WordPress". Boldr tries to be none of that.
____
### Tech Stack

* Node 6
* [Koa v2](http://koajs.com/)
* [React](http://facebook.github.io/react/) 15
* Postgres 9.5  
____

### Alpha 3
7/3/2016  


____

## Getting Started
At the moment, Boldr is in active development and not quite ready for use.

```bash
$ git clone git@github.com:strues/boldr.git
$ npm install
```

Rename `example.env` to `.env`  and modify the values to match your environment.

A Docker-Compose file along with a Postgres Dockerfile are included in the repository for you to use if you'd like.

Create the database for Boldr to use, and put it in the .env file where you see
`PG_DB_NAME=`

```bash
$ npm run migrate
$ npm run seed
```
The above command will create the table structure for your database. It will populate a fake user with the following credentials: test@test.com // password. It also establishes the default groups and permissions data.

#### Development

```bash
$ npm start
```

#### Production
> No way. Not yet.

## Contribute
Looking for an open source project to contribute to? We could use a hand developing Boldr.

## Documentation
#### API Documentation
[View Here](docs/api/apidocs.md)  

#### Change Log
[View Here](docs/CHANGELOG.md)

[logo]: https://boldr.io/favicon-96x96.png "Boldr"
