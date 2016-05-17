import Joi from 'joi';

const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email().required(),
  location: Joi.string(),
  bio: Joi.string(),
  avatar: Joi.string(),
  website: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string()
});

export default userSchema;
