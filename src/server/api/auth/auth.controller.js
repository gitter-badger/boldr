import passport from 'passport';
import Boom from 'boom';

import { User } from '../../db/models';
import { signToken } from '../../middleware/auth/authService';

/**
 * @api {post} /auth/login          Login to a registered account.
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String}   Email       The email address registered to the account.
 * @apiParam {String}   Password    The password
 * @apiSuccess {String} Token       The jsonwebtoken
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI...."}
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) {
      console.log(authErr);
      return next(authErr);
    }
    if (!user) {
      return Boom.unauthorized(info.message);
    }

    return req.logIn(user, (loginErr) => {
      if (loginErr) {
        return Boom.unauthorized(loginErr);
      }

      signToken(user.id, user.role).then(token => {
        req.user = user;
        return res.status(200).json({ token });
      });
    });
  })(req, res, next);
}

/**
 * @api {post} /auth/logout           Remove the session information
 * @apiVersion 1.0.0
 * @apiName logout
 * @apiGroup Auth
 */
export function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * @api {post} /auth/signup           Create a new account.
 * @apiVersion 1.0.0
 * @apiName signup
 * @apiGroup Auth
 */
export async function signUp(req, res, next) {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      name: req.body.name,
      location: req.body.location,
      bio: req.body.bio,
      picture: req.body.picture,
      gender: req.body.gender,
      website: req.body.website,
      provider: 'local'
    };
    const user = await User.createWithPass(userData);
    req.logIn(user, (err) => {
      if (err) {
        return Boom.unauthorized({ message: err });
      }
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  } catch (err) {
    return next(err);
  }
}

export async function checkUser(req, res, next) {
  try {
    User.findById(req.user.id)
      .then((result) => {
        return res.status(200).json(result);
      });
  } catch (err) {
    return Boom.forbidden(err);
  }
}

export default {
  login,
  logout,
  signUp,
  checkUser
};
