// Base URL :- /auth/

var express = require("express");
var { body } = require("express-validator");
var { errHandler } = require("./errValidator");
var { UserSingup, UserLogin } = require("../services/userAuth");

var authRouter = express.Router();

authRouter.post(
  "/register",
  [
    body(["adhaar", "name", "password"])
      .notEmpty()
      .withMessage("No field should be empty!"),
    body("adhaar")
      .isLength({ min: 12, max: 12 })
      .withMessage("Invalid adhaar number!"),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password should be minimum 8 Characters!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/
      )
      .withMessage("Password must contain alphabets, numbers & symbols!!"),
  ],
  errHandler,
  UserSingup
);

authRouter.post(
  "/login",
  [
    body(["adhaar", "password"])
      .notEmpty()
      .withMessage("No field should be empty!"),
  ],
  errHandler,
  UserLogin
);

module.exports = authRouter;
