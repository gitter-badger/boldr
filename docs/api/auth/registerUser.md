# POST /api/v1/auth/register

+ Request (application/json)

    + Headers

            Cookie: token=[object Promise]; koa.sid=0pmF_r1W0mKLD4iquciKXrzM9BeMrRZB

    + Body

            {
                "email": "test@test.com",
                "password": "password",
                "username": "test",
                "last": "Bob",
                "first": "Joe",
                "avatar": "http://placehold.it/250x250",
                "website": "google",
                "location": "Boldr",
                "bio": "Hey this is my bio and isnt it awesome"
            }

+ Response 201 (application/json; charset=utf-8)

    + Headers

            X-Content-Type-Options: nosniff
            Etag: "115-g64J+hcqUcDVpISnV81dwQ"
            X-Download-Options: noopen
            X-Frame-Options: SAMEORIGIN
            X-XSS-Protection: 1; mode=block
            Vary: X-HTTP-Method-Override

    + Body

            {"email":"test@test.com","username":"test","password":"$2a$10$XMBVE5/qrSbKGnP5.y5iNelqUItrx6zWmgT2ZxCyO0HbsYYhq8Y6i","location":"Boldr","bio":"Hey this is my bio and isnt it awesome","avatar":"http://placehold.it/250x250","name":{"first":"Joe","last":"Bob"},"website":"google"}
