const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required().min(3).max(40),

  first_name: Joi.string().required().min(3).max(40),

  last_name: Joi.string().required().min(3).max(40),

  email: Joi.string().email().required(),

  password: Joi.string().min(7).max(70).required(),

  phone_number: Joi.number().required(),

  latitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  longitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),
}).unknown(true);

const validUserSchema = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

module.exports = validUserSchema;
