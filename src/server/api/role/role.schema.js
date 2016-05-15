import Joi from 'joi';

const roleSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string(),
  permissions: {
    editContent: Joi.boolean().required(),
    createContent: Joi.boolean().required(),
    deleteContent: Joi.boolean().required(),
    manageMedia: Joi.boolean().required(),
    manageUsers: Joi.boolean().required(),
    manageRoles: Joi.boolean().required(),
    manageSettings: Joi.boolean().required(),
    allPrivilages: Joi.boolean().required()
  }
});

export default roleSchema;
