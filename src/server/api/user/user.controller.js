import Boom from 'boom';
import { User } from '../../db/models';

/**
 * Load user and append to req.
 */
export function load(req, res, next, id) {
  User.findById(id).then((user) => {
    req.user = user;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({});

    return res.status(200).json(users);
  } catch (error) {
    Boom.badRequest({ message: error });
    next(error);
  }
};

export default {
  load,
  getAllUsers
};
