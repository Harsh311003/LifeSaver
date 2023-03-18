var User = require("./models/user");
var expressJwt = require("express-jwt");
var { jwt } = require("./config/keys");
var mongoose = require("mongoose");
const Doctor = require("./models/doctor");

exports.isSignedIn = expressJwt({
  secret: jwt.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isVerified = (req, res, next) => {
  // check if user exists or not
  User.findById(req.auth._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not registered!",
          success: false,
        });
      } else {
        // storing user data in req object and passing to next function
        req.root = { ...user, encry_password: undefined, salt: undefined };
        next();
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};

exports.isAdmin = (req, res, next) => {
  var dbo = mongoose.connection; // getting db connection object
  // checking admin collection for requesting user
  dbo
    .collection("admin")
    .findOne({ _id: mongoose.mongo.ObjectID(req.auth._id) })
    .then((admin) => {
      if (!admin) {
        return res
          .status(401)
          .json({ error: "Not Authorized!", success: false });
      } else {
        // storing details in req object
        req.root = { ...admin };
        next();
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};

exports.isDoctor = (req, res, next) => {
  Doctor.findById(req.auth._id)
    .then((doctor) => {
      if (!doctor) {
        return res
          .status(404)
          .json({ error: "Doctor not registered!", success: false });
      } else {
        req.root = { ...doctor, encry_password: undefined, salt: undefined };
        next();
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};
