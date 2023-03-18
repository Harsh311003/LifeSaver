var User = require("./models/user");
var expressJwt = require("express-jwt");
var { jwt } = require("./config/keys");

exports.isSignedIn = expressJwt({
  secret: jwt.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isVerified = (req, res, next) => {
  User.findById(req.auth._id).then((user) => {
    if (!user) {
      return res.status(404).json({
        error: "User not registered!",
        success: false,
      });
    } else {
      req.root = { ...user, encry_password: undefined, salt: undefined };
      next();
    }
  });
};
