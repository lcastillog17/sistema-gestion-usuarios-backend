const { body, validationResult } = require("express-validator");

const userDataValidations = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("username").notEmpty(),
];

const userLoginValidations = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

const profileDataValidations = [
  body("first_name").isString(),
  body("last_name").isString(),
  body("birthdate").isISO8601().toDate(),
  //body("profile_picture").isURL(),
];

const validator = (validations) => [
  validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validator, userDataValidations, userLoginValidations, profileDataValidations };
