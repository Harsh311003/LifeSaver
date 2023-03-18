var Doctor = require("../models/doctor");
var mongoose = require("mongoose");
var JWT = require("jsonwebtoken");
var { jwt } = require("../config/keys");

exports.adminLogin = (req, res) => {
  const dbo = mongoose.connection;

  dbo
    .collection("admin")
    .findOne({ username: req.body.username })
    .then((admin) => {
      if (!admin) {
        return res
          .status(404)
          .json({ error: "Admin user doesn't exist!", success: false });
      }
      // matching password with admin object
      if (req.body.password !== admin.password) {
        return res.status(401).json({
          error: "Username & password doesn't match!",
          success: false,
        });
      }

      var token = JWT.sign({ _id: admin._id }, jwt.jwtSecret, {
        expiresIn: 6040800, // 1 week in seconds
      });
      return res.status(200).json({
        msg: "Admin Successfully Logged In!",
        success: true,
        token: token,
      });
    })
    .catch((err) => {
      // db error
      res.status(502).json({ error: err, success: false });
    });
};
// creating doctor profile only for admins
exports.doctorRegister = (req, res) => {
  Doctor.findOne({ licId: req.body.licId })
    .then((doctor) => {
      if (doctor) {
        return res
          .status(400)
          .json({ error: "Already registered", success: false });
      }
      // creating an object of Doctor type
      var newDoctor = new Doctor({
        name: req.body.name,
        licId: req.body.licId,
        password: req.body.password,
        phone: req.body.phone,
      });

      newDoctor
        .save()
        .then((savedDoctor) => {
          return res
            .status(201)
            .json({ msg: "Doctor Created!", success: true });
        })
        .catch((err) => {
          return res.status(502).json({ error: err, success: false });
        });
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};

exports.doctorLogin = (req, res) => {
  Doctor.findOne({ licId: req.body.licId })
    .then((doctor) => {
      if (!doctor) {
        return res
          .status(404)
          .json({ error: "Not registered! Ask admin to create an account!" });
      } else if (!doctor.authenticate(req.body.password)) {
        return res
          .status(401)
          .json({ error: "Id & Password don't match!!", success: false });
      } else {
        const token = JWT.sign({ _id: doctor._id }, jwt.jwtSecret, {
          expiresIn: 6040800,
        });
        return res
          .status(200)
          .json({ msg: "Doctor logged in!", success: true, token: token });
      }
    })
    // catching errors
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};
