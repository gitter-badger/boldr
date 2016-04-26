import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import Debug from 'debug';

import User from 'server/db/models/User';
import errors from 'server/middlewares/responses/errors';

const saltAndHashPassword = pwd => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pwd, salt, (_err, hash) => {
      if (_err) {
        return reject(_err);
      }
      return resolve(hash);
    });

    if (err) {
      return reject(err);
    }
  });
});

export function getUserById(req, res, next) {
  User.where('id', req.params.id).fetch({
    columns: ['display_name', 'username', 'email', 'id', 'avatar']
  }).then(result => {
    if (result) {
      res.status(200);
      return res.json({
        user: result
      });
    }

    res.status(204);
    return res.json({
      message: 'User not found'
    });
  })
    .catch(err => {
      return next(new errors.BadRequest(`Couldnt get user by id because: ${err}`));
    });
}

export function getUserByEmail(req, res) {
  User.where('email', req.params.email).fetch({
    columns: ['email', 'display_name', 'username', 'id', 'avatar']
  }).then(result => {
    if (result) {
      res.status(200);
      return res.json({
        user: result
      });
    }

    res.status(204);
    return res.json({
      message: 'User not found'
    });
  });
}

export function getUserByUsername(req, res) {
  User.where('username', req.params.username).fetch({
    columns: ['display_name', 'username', 'email', 'id', 'avatar']
  }).then(result => {
    if (result) {
      res.status(200);
      return res.json({
        user: result
      });
    }

    res.status(204);
    return res.json({
      message: 'User not found'
    });
  });
}

/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 */
export function registerUser(req, res, next) {
  Debug(`Creating user ${req.body.username}`);
  saltAndHashPassword(req.body.password)
  .then(hash => {
    User.forge({
      username: req.body.username,
      display_name: req.body.displayName,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      location: req.body.location,
      website: req.body.website,
      slug: req.body.slug,
      status: req.body.status,
      uuid: uuid.v4(),
      avatar: req.body.avatar,
      bio: req.body.bio,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      password: hash,
      email: req.body.email,
      role: 'admin'
    })
      .save()
      .then(user => {
        res.status(201);
        return res.json({
          data: user
        });
      })
    .catch(err => {
      return next(new errors.BadRequest(`Failed to register user during DB insert: ${err}`));
    });
  })
    .catch(err => {
      return next(new errors.BadRequest(`There was a problem saving: ${err}`));
    });
}

/**
 * @description
 * logs a user into his or her account.
 * @route /api/v1/auth/login
 * @method POST
 */
export function loginUser(req, res, next) {
  const fieldName = req.body.email.indexOf('@') > 0 ? 'email' : 'username';
  User.where(fieldName, req.body.email)
    .fetch({
      columns: ['password', 'id']
    }).then(result => {
      if (!result) {
        return next(new errors.NotFound('The user could not be found.'));
      }

      Debug(result, `User fetched from DB, validating against ${req.body.password}`);
      bcrypt.compare(req.body.password, result.attributes.password, (err, validated) => {
        if (err) {
          return next(new errors.Internal('Theres a problem with the server handling the request'));
        }

        if (validated) {
          const token = jwt.sign(result.id, 'jwtsecret', {
            expiresIn: 60 * 60 * 5
          });
          res.status(200);
          return res.json({
            token
          });
        }
        next(new errors.Unauthorized('Sorry you are not authorized to make the request'));
      });
    }).catch(err => {
      return next(new errors.Internal(`There was a probleming looking into the user in the database ${err}`));
    });
}
