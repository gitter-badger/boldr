# POST /api/v1/posts

+ Request (application/json)

    + Headers

            Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6eyJpZCI6MX0sImlhdCI6MTQ2MjA0ODExMX0.kRZF30k3SXfcW12inH8rnwgpR6vuLD_1RqHf7A2bk7o

    + Body

            {
                "title": "Post Title",
                "slug": "post-slug",
                "markup": "<h1>asdfasdfasdf</h1>",
                "content": "this stuff is stuff",
                "image": "http://placehold.it/760x300",
                "is_public": true
            }

+ Response 201 (text/plain; charset=utf-8)

    + Headers

            X-Content-Type-Options: nosniff
            X-Download-Options: noopen
            X-Frame-Options: SAMEORIGIN
            X-XSS-Protection: 1; mode=block
            Vary: X-HTTP-Method-Override

    + Body

            Created


