// Base URL :- /user

const express = require("express");
const { isSignedIn, isVerified } = require("../../middleware");
const ambulanceRouter = express.Router();
const Ambulance = require("../../models/ambulance");
var { body } = require("express-validator");
const { errHandler } = require("../errValidator");

ambulanceRouter.get("/", isSignedIn, (req, res) => {
  res.setHeader("Content-Range", "ambulance 0-10/20");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  Ambulance.find({}).exec((err, ambulances) => {
    if (err) {
      return res.status(400).json({
        error: "Not FOUND",
      });
    }
    return res.json(ambulances.map((a) => a.transform()));
  });
});
ambulanceRouter.get("/:id", isSignedIn, (req, res) => {
  Ambulance.findOne({ _id: req.params.id }).exec((err, ambulance) => {
    if (err) {
      return res.status(400).json({
        error: "Not FOUND",
      });
    }
    res.json(ambulance.transform());
  });
});
ambulanceRouter.post(
  "/",
  [
    body(["plateNo", "regNo", "chassisNo"])
      .notEmpty()
      .withMessage("No field should be empty!"),
  ],
  errHandler,
  isSignedIn,

  (req, res) => {
    const ambulance = new Ambulance(req.body);
    ambulance.save((err, savedAmbulance) => {
      if (err) {
        return res.status(400).json({
          error: "Not FOUND",
        });
      }
      res.json(savedAmbulance.transform());
    });
  }
);
ambulanceRouter.put(
  "/:id",
  [
    body(["plateNo", "regNo", "chassisNo"])
      .notEmpty()
      .withMessage("No field should be empty!"),
  ],
  errHandler,
  isSignedIn,

  (req, res) => {
    Ambulance.findOne({ _id: req.params.id }).exec((err, ambulance) => {
      if (err) {
        return res.status(400).json({
          error: "Not FOUND",
        });
      }
      const { plateNo, regNo, chassisNo } = req.body;
      if (plateNo) ambulance.plateNo = plateNo;
      if (regNo) ambulance.regNo = regNo;
      if (chassisNo) ambulance.chassisNo = chassisNo;
      ambulance.save((err, updatedAmbulance) => {
        if (err) {
          return res.status(400).json({
            error: "Not FOUND",
          });
        }
        res.json(updatedAmbulance.transform());
      });
    });
  }
);
ambulanceRouter.delete("/:id", isSignedIn, (req, res) => {
  Ambulance.findByIdAndDelete(req.params.id, (err, deletedAmbulance) => {
    if (err) {
      return res.status(400).json({
        error: "Not deleted",
      });
    }
    return res.json(deletedAmbulance.transform());
  });
});
module.exports = ambulanceRouter;
