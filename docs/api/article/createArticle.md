# POST /api/v1/articles

+ Request (application/json)

    + Headers

            Cookie: token=[object Promise]; koa.sid=OMreDoAif_E4tFvDYxjrpwlP4s1_DRQP
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjNhOGJjMTExLTZmN2YtNDdhMC1iMDY0LTc1OTgyNDg3M2Y0NCIsImlhdCI6MTQ2MzExMzQ0NH0.PaEPD69DtrEFebS5hPP_faPLdtFUFb7uR2FoS7KjgGw

    + Body

            {
                "title": "Hello THAR",
                "markup": "<h1>Hi</h1>",
                "slug": "thar",
                "featureImage": "http://placehold.it/720x360",
                "content": "Hi",
                "isDraft": true
            }

+ Response 201 (application/json; charset=utf-8)

    + Headers

            X-Content-Type-Options: nosniff
            Etag: "df-pu1SQoWyPy8TsS0PYQ0tOw"
            X-Download-Options: noopen
            X-Frame-Options: SAMEORIGIN
            X-XSS-Protection: 1; mode=block
            Vary: X-HTTP-Method-Override

    + Body

            {"title":"Hello THAR","slug":"thar","markup":"<h1>Hi</h1>","content":"Hi","featureImage":"http://placehold.it/720x360","authorId":"3a8bc111-6f7f-47a0-b064-759824873f44","isDraft":true,"createdAt":"2016-05-13T04:26:19.394Z"}
