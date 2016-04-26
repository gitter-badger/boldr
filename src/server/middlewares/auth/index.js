import jwt from 'jsonwebtoken';
import Debug from 'debug';
import config from 'config';
export const decodeToken = (req, res, next) => {
  if (req.headers.hasOwnProperty('x-user-token')) {
    jwt.verify(req.header('x-user-token'), config.secret, (err, decoded) => {
      if (err) {
        Debug(err, `Failed to check token ${req.header('x-user-token')}`);
      }

      req.decoded = decoded;
      return next();
    });
  } else return next();
};

export const authenticate = (req, res, next) => {
  Debug('Authorizing request... ', req.body);

  if (req.headers.hasOwnProperty('x-user-token')) {
    jwt.verify(req.header('x-user-token'), config.secret, (err, decoded) => {
      if (err) {
        Debug(err, `Failed to authenticate token ${req.header('x-user-token')}`);
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
