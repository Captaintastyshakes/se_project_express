const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error(`string.uri`);
};

const itemBodyValidator = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": "The minimum length of the 'name' field is 2.",
        "string.max": "The maximum length of the 'name' field is 30.",
        "string.empty": "The 'name' field must be filled in.",
      }),
      imageUrl: Joi.string().required().custom(validateUrl).messages({
        "string.empty": "The 'image url' field must be filled in.",
        "string.uri": "The 'image url' field must be a valid url.",
      }),
    }),
  });
};
/* The item name is a required string of between 2 and 30 characters.
An image URL is a required string in a URL format. */

const userBodyValidator = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": "The minimum length of the 'name' field is 2.",
        "string.max": "The maximum length of the 'name' field is 30.",
        "string.empty": "The 'name' field must be filled in.",
      }),
      avatar: Joi.string().required().custom(validateUrl).messages({
        "string.empty": "The 'avatar url' must be filled in.",
        "string.uri": "The 'avatar url' field must be a valid url.",
      }),
      email: Joi.email().required().messages({
        "string.empty": "The 'email' field must be filled in.",
        "string.email": "The 'email' field must be a valid email.",
      }),
      password: Joi.string().required().min(8).max(30).messages({
        "string.min": "The minimum length of the 'name' field is 8.",
        "string.max": "The maximum length of the 'name' field is 30.",
        "string.empty": "The 'name' field must be filled in.",
      }),
    }),
  });
};
/* The user name is a string of between 2 and 30 characters.
The user avatar is a required string in a URL format.
Email is a required string in a valid email format.
Password is a required string. */

const authValidator = () => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.email().required().messages({
        "string.empty": "The 'email' field must be filled in.",
        "string.email": "The 'email' field must be a valid email.",
      }),
      password: Joi.string().required().min(8).max(30).messages({
        "string.min": "The minimum length of the 'password' field is 8.",
        "string.max": "The maximum length of the 'password' field is 30.",
        "string.empty": "The 'password' field must be filled in.",
      }),
    }),
  });
};
/* Email is a required string in a valid email format.
Password is a required string. */

const contentIdValidator = () => {
  celebrate({
    params: Joi.object().keys({
      _id: Joi.number(validator.isHexadecimal)
        .required()
        .min(24)
        .max(24)
        .messages({
          "string.min": "The minimum length of the 'id' is 24.",
          "string.max": "The maximum length of the 'id' field is 24.",
          "string.empty": "The 'id' must be present.",
        }),
    }),
  });
};
// IDs must be a hexadecimal value length of 24 characters.

module.exports = {
  itemBodyValidator,
  userBodyValidator,
  authValidator,
  contentIdValidator,
  validateUrl,
};
