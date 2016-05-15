import Joi from 'joi';

const tagSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string()
});

export default tagSchema;
