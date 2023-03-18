// Base URL :- /user

const express = require("express");
const { isSignedIn, isVerified, isAdmin } = require("../middleware");
const diseaseRouter = express.Router();
const Disease = require("../models/disease");
var { body } = require("express-validator");
const { errHandler } = require("./errValidator");

diseaseRouter.get("/", isSignedIn, isAdmin, (req, res) => {
  res.setHeader("Content-Range", "Disease 0-10/20");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  Disease.find({}).exec((err, diseases) => {
    if (err) {
      return res.status(400).json({
        error: "Not FOUND",
      });
    }
    return res.json(diseases.map((a) => a.transform()));
  });
});
diseaseRouter.get("/:id", isSignedIn, isAdmin, (req, res) => {
  Disease.findOne({ _id: req.params.id }).exec((err, disease) => {
    if (err) {
      return res.status(400).json({
        error: "Not FOUND",
      });
    }
    res.json(disease.transform());
  });
});
diseaseRouter.post(
  "/",
  [body(["name"]).notEmpty().withMessage("No field should be empty!")],
  errHandler,
  isSignedIn,
  isAdmin,
  (req, res) => {
    const disease = new Disease(req.body);
    disease.save((err, savedDisease) => {
      if (err) {
        return res.status(400).json({
          error: "Not FOUND",
        });
      }
      res.json(savedDisease.transform());
    });
  }
);
diseaseRouter.put(
  "/:id",
  [body(["name"]).notEmpty().withMessage("No field should be empty!")],
  errHandler,
  isSignedIn,
  isAdmin,
  (req, res) => {
    Disease.findOne({ _id: req.params.id }).exec((err, disease) => {
      if (err) {
        return res.status(400).json({
          error: "Not FOUND",
        });
      }
      const { name } = req.body;
      if (name) disease.name = name;
      disease.save((err, updatedDisease) => {
        if (err) {
          return res.status(400).json({
            error: "Not FOUND",
          });
        }
        res.json(updatedDisease.transform());
      });
    });
  }
);
diseaseRouter.delete("/:id", isSignedIn, isAdmin, (req, res) => {
  Disease.findByIdAndDelete(req.params.id, (err, deletedDisease) => {
    if (err) {
      return res.status(400).json({
        error: "Not deleted",
      });
    }
    return res.json(deletedDisease.transform());
  });
});
module.exports = diseaseRouter;
