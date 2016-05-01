# POST /api/v1/auth/register

+ Request (application/json)

    + Headers

            Cookie: sessionId=s%3A1WA8bGmtpO3tg1ko6qDEdh7itkGItFnH.bVgtaDXG4FU5v2XVpLZnQp5SR%2F%2BQsOy0BMJDRmZk77w

    + Body

            {
                "email": "hello@test.com",
                "password": "test",
                "displayName": "testfff",
                "firstName": "John",
                "lastName": "Doe",
                "website": "https://boldr.io",
                "avatar": "http://placehold.it/250x250",
                "bio": "hello my name is",
                "username": "hello",
                "location": "narnia",
                "twitter": "@test",
                "facebook": "facebook.com/test"
            }

+ Response 201 (application/json; charset=utf-8)

    + Headers

            X-Content-Type-Options: nosniff
            Etag: "18a-AF+EU5k/hny9fwGfdbwwVg"
            X-Download-Options: noopen
            X-Frame-Options: SAMEORIGIN
            X-XSS-Protection: 1; mode=block
            Vary: X-HTTP-Method-Override

    + Body

            {"username":"hello","display_name":"testfff","first_name":"John","last_name":"Doe","location":"narnia","website":"https://boldr.io","uuid":"1295137f-1453-4317-97af-649c0f6eea1f","avatar":"http://placehold.it/250x250","bio":"hello my name is","facebook":"facebook.com/test","twitter":"@test","role":"admin","updated_at":"2016-05-01T03:54:06.360Z","created_at":"2016-05-01T03:54:06.361Z","id":11}


