# POST /api/v1/auth/login

+ Request (application/json)

    + Headers

            Cookie: token=[object Promise]; koa.sid=OMreDoAif_E4tFvDYxjrpwlP4s1_DRQP

    + Body

            {
                "email": "test@test.com",
                "password": "password"
            }

+ Response 200 (application/json; charset=utf-8)

    + Headers

            X-Content-Type-Options: nosniff
            Set-Cookie: koa.sid=OMreDoAif_E4tFvDYxjrpwlP4s1_DRQP; path=/; httponly
            Etag: "e8-Cywssa9vHTI2FCmpk9kcLg"
            X-Download-Options: noopen
            X-Frame-Options: SAMEORIGIN
            X-XSS-Protection: 1; mode=block
            Vary: X-HTTP-Method-Override

    + Body

            {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjNhOGJjMTExLTZmN2YtNDdhMC1iMDY0LTc1OTgyNDg3M2Y0NCIsImlhdCI6MTQ2MzExMzQ0NH0.PaEPD69DtrEFebS5hPP_faPLdtFUFb7uR2FoS7KjgGw"}
