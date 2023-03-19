// Base URL :- /auth/

var express = require("express");
var { body } = require("express-validator");
var { errHandler } = require("./errValidator");
var {
  UserSingup,
  UserLogin,
  driverRegister,
  driverLogin,
} = require("../services/userAuth");
var {
  adminLogin,
  doctorRegister,
  doctorLogin,
} = require("../services/adminAuth");
const { isSignedIn, isAdmin } = require("../middleware");

var authRouter = express.Router();

// user register
authRouter.post(
  "/register",
  [
    // checks on fields for registering a user
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
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/ // regex for checking password format
      )
      .withMessage("Password must contain alphabets, numbers & symbols!!"),
  ],
  errHandler,
  UserSingup
);
// user login
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
// doctor register - FOR ADMINS ONLY
authRouter.post(
  "/driver/register",
  [
    // request body checks
    body(["adhaar", "password", "name", "phone", "dLicId"])
      .notEmpty()
      .withMessage("No fields should be empty!"),
    body("name").isLength({ min: 3 }).withMessage("Name too short!"),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password should be min 8 characters!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/
      )
      .withMessage("Password must contain alphabets, numbers & symbols!!"),
  ],
  errHandler,
  isSignedIn,
  isAdmin,
  driverRegister
);
// doctor login
authRouter.post(
  "/driver/login",
  [
    body(["adhaar", "password"])
      .notEmpty()
      .withMessage("No fields should be empty!"),
  ],
  errHandler,
  driverLogin
);
// admin login
authRouter.post(
  "/admin/login",
  [
    body(["username", "password"])
      .notEmpty()
      .withMessage("No fields should be empty!"),
  ],
  errHandler,
  adminLogin
);
authRouter.post("/admin/isAdmin", isSignedIn, isAdmin, (req, res) => {
  res.json({ message: "admin authorized successfully !" });
});
// doctor register - FOR ADMINS ONLY
authRouter.post(
  "/doc/register",
  [
    // request body checks
    body(["licId", "password", "name", "phone"])
      .notEmpty()
      .withMessage("No fields should be empty!"),
    body("name").isLength({ min: 3 }).withMessage("Name too short!"),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password should be min 8 characters!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/
      )
      .withMessage("Password must contain alphabets, numbers & symbols!!"),
  ],
  errHandler,
  isSignedIn,
  isAdmin,
  doctorRegister
);
// doctor login
authRouter.post(
  "/doc/login",
  [
    body(["licId", "password"])
      .notEmpty()
      .withMessage("No fields should be empty!"),
  ],
  errHandler,
  doctorLogin
);

module.exports = authRouter;
