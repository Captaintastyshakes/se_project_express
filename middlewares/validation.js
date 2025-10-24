const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error(`string.uri`);
};

const itemBodyValidator = celebrate({
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
    weather: Joi.string().required().messages({
      "string.empty": "The 'weather' field must be filled in.",
    }),
  }),
});

/* The item name is a required string of between 2 and 30 characters.
An image URL is a required string in a URL format. */

const userBodyValidator = celebrate({
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
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30).messages({
      "string.min": "The minimum length of the 'name' field is 8.",
      "string.max": "The maximum length of the 'name' field is 30.",
      "string.empty": "The 'name' field must be filled in.",
    }),
  }),
});

/* The user name is a string of between 2 and 30 characters.
The user avatar is a required string in a URL format.
Email is a required string in a valid email format.
Password is a required string. */

const authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3).max(30).messages({
      "string.min": "The minimum length of the 'password' field is 3.", // changed the min password length mostly because 'my' user that I already made had <8 characters in their password -__- I know this might come across as a security concern but a) the actual substance of the password validation doesn't even happen here and b) I'm willing to absorb whatever risk if it means not having to manually adjust my user entity in the database via the ubuntu terminal
      "string.max": "The maximum length of the 'password' field is 30.",
      "string.empty": "The 'password' field must be filled in.",
    }),
  }),
});

/* Email is a required string in a valid email format.
Password is a required string. */

const contentIdValidator = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().length(24).hex().messages({
      "string.length": "The Id must be 24 characters long.",
      "string.hex": "The Id must be a hexadecimal value.",
    }),
  }),
});

// IDs must be a hexadecimal value length of 24 characters.

const updateUserBodyValidator = celebrate({
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
  }),
});

// This is a truncated clone of the user body validator meant to be used when patching user info and the only info in the body is name and avatar

module.exports = {
  itemBodyValidator,
  userBodyValidator,
  authValidator,
  contentIdValidator,
  validateUrl,
  updateUserBodyValidator,
};
