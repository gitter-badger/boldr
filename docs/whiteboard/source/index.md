---
title: Boldr API Reference

language_tabs:
  - bash
  - javascript

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='http://github.com/mpociot/whiteboard'>Documentation Powered by Whiteboard</a>

includes:
  - errors

search: true
---

# Introduction

You managed to find your way over to the Boldr API docs! 



# Authentication

> To Login with an account, use this code:

```javascript
request
  .post('http://localhost:3000/api/v1/auth/login')
  .send({
    "email": "test@test.com",
    "password": "test"
  })
  .set('Content-Type', 'application/json')
  .redirects(0)
  .end(function(err, res){
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      console.log('yay got ' + JSON.stringify(res.body));
    }
  });
```

```bash
curl -X "POST" "http://localhost:3000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"test\"}"
```


`Authorization: Bearer TOKEN`

<aside class="notice">
Token Secret is set in the `.env` file.
</aside>

# Posts

## Get All Posts

```javascript
request
  .get('http://localhost:3000/api/v1/posts')
  .redirects(0)
  .end(function(err, ctx){
    if (err || !ctx.ok) {
      console.log('Oh no! error');
    } else {
      console.log('yay got ' + JSON.stringify(ctx.request.body));
    }
  });
```

```bash
curl -X "GET" "http://localhost:3000/api/v1/posts"
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 4,
    "title": "The Koala Bear",
    "slug": "koala-bear",
    "markup": "",
    "content": "this stuff is stuff",
    "image": "http:\/\/placehold.it\/760x300",
    "author_id": 1,
    "views": 0,
    "is_public": true,
    "created_at": "2016-04-30T22:02:51.417Z",
    "updated_at": null,
    "tags": null
  },
  {
    "id": 6,
    "title": "Purple Penguins",
    "slug": "penguins",
    "markup": "<h1>asdfasdfasdf<\/h1>",
    "content": "this stuff is stuff",
    "image": "http:\/\/placehold.it\/760x300",
    "author_id": 1,
    "views": 0,
    "is_public": true,
    "created_at": "2016-04-30T22:05:19.551Z",
    "updated_at": null,
    "tags": null
  },
  {
    "id": 7,
    "title": "Green Dogs",
    "slug": "dogs",
    "markup": "<h1>asdfasdfasdf<\/h1>",
    "content": "this stuff is stuff",
    "image": "http:\/\/placehold.it\/760x300",
    "author_id": 1,
    "views": 0,
    "is_public": true,
    "created_at": "2016-04-30T22:07:33.825Z",
    "updated_at": null,
    "tags": null
  },
  {
    "id": 9,
    "title": "Post Title",
    "slug": "post-slug",
    "markup": "<h1>asdfasdfasdf<\/h1>",
    "content": "this stuff is stuff",
    "image": "http:\/\/placehold.it\/760x300",
    "author_id": 1,
    "views": 0,
    "is_public": true,
    "created_at": "2016-04-30T22:13:39.450Z",
    "updated_at": null,
    "tags": null
  },
  {
    "id": 10,
    "title": "Going to the zooooo",
    "slug": "zoo-zoo-zoo",
    "markup": "<h1>asdfasdfasdf<\/h1>",
    "content": "this stuff is stuff",
    "image": "http:\/\/placehold.it\/760x300",
    "author_id": 1,
    "views": 0,
    "is_public": true,
    "created_at": "2016-05-01T20:24:37.242Z",
    "updated_at": null,
    "tags": null
  },
  {
    "id": 11,
    "title": "Home run",
    "slug": "home-run",
    "markup": "<h1>asdfasdfasdf<\/h1>",
    "content": "this stuff is stuff",
    "image": "http:\/\/placehold.it\/760x300",
    "author_id": 1,
    "views": 0,
    "is_public": true,
    "created_at": "2016-05-02T03:23:29.632Z",
    "updated_at": null,
    "tags": null
  }
]
```

This endpoint retrieves all posts.

### HTTP Request

`GET /api/v1/posts`


## Get a Specific Post

```javascript

```

```bash
curl "http://localhost:3000/api/v1/posts/1"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific post.



### HTTP Request

`GET http://localhost:3000/api/v1/posts/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the post to retrieve
