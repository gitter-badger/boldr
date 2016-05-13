# POST /api/v1/tags

+ Request (application/json)

    + Headers

            Cookie: token=[object Promise]; koa.sid=OMreDoAif_E4tFvDYxjrpwlP4s1_DRQP
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjMwNjQzODksImV4cCI6MTQ2MzY2OTE4OX0.HxEEjhbZip6_SJRcP8x2X8qL4M0E9t2P6woGXGHNqOk

    + Body

            {
                "name": "Foos",
                "description": "The fooest of tags"
            }

+ Response 201 (application/json; charset=utf-8)

    + Headers

            X-Content-Type-Options: nosniff
            Etag: "32-9umw3O5DzaUlYyiR7fTqjQ"
            X-Download-Options: noopen
            X-Frame-Options: SAMEORIGIN
            X-XSS-Protection: 1; mode=block
            Vary: X-HTTP-Method-Override

    + Body

            {"name":"Foos","description":"The fooest of tags"}
