var User = require("../models/user");
var JWT = require("jsonwebtoken");
var { jwt } = require("../config/keys");
const passport = require("passport");

exports.UserSingup = (req, res) => {
  User.findOne({ adhaar: req.body.adhaar })
    .then((user) => {
      // check for exisiting user with same adhaar number
      if (user) {
        return res
          .status(400)
          .json({ error: "User already registered!", success: false });
      }

      // creating new user
      var newUser = new User(req.body);
      newUser
        .save()
        .then((savedUser) => {
          console.log("New user created!");
          return res
            .status(201)
            .json({ msg: "Signup Successful!", success: true });
        })
        .catch((err) => {
          // handling errors
          return res.status(502).json({ error: err, success: false });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err, success: false });
    });
};

exports.UserLogin = (req, res, next) => {
  // local strategy of user authentication
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json(info);
    } else {
      // successful login & token generation
      const token = JWT.sign({ _id: user._id }, jwt.jwtSecret, {
        expiresIn: 6040800, // 1 week in seconds - Expiry Time Of Jwt Token
      });
      return res
        .status(200)
        .json({ msg: "Login Success!", token: token, success: true });
    }
  })(req, res, next);
};
