import jwt from 'jsonwebtoken';
export const decodeToken = (req, res, next) => {
  if (req.headers.hasOwnProperty('x-user-token')) {
    jwt.verify(req.header('x-user-token'), 'jwtsecret', (err, decoded) => {
      if (err) {
        console.error(err, `Failed to check token ${req.header('x-user-token')}`);
      }

      req.decoded = decoded;
      return next();
    });
  } else return next();
};

export const authenticate = (req, res, next) => {
  console.info('Authorizing request... ', req.body);

  if (req.headers.hasOwnProperty('x-user-token')) {
    jwt.verify(req.header('x-user-token'), 'jwtsecret', (err, decoded) => {
      if (err) {
        console.error(err, `Failed to authenticate token ${req.header('x-user-token')}`);
        res.status(403);
        return res.json({
          success: false,
          message: err.name
        });
      }

      req.decoded = decoded;
      return next();
    });
  } else {
    res.status(403);
    return res.json({
      error: 'unauthorized'
    });
  }
};
