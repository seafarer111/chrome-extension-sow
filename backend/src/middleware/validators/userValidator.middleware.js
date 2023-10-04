const { body } = require("express-validator");
const UserRole = require("../../utils/userRoles.utils");
const SignRole = require("../../utils/signtypeRoles.utils");

exports.createUserSchema = [
  // body("name").exists().withMessage("username is required"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  // body("role")
  //   .optional()
  //   .isIn([UserRole.Admin, UserRole.Common])
  //   .withMessage("Invalid USer Role type"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 6 characters"),
  body("signtype")
    .optional()
    .isIn([SignRole.Email, SignRole.Google, SignRole.FaceBook])
    .withMessage("Invalid Sign Role type"),
];
exports.validateLogin = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("password").exists().withMessage("Password is required"),
];
exports.validateForget = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
];
