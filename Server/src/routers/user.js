// Base URL :- /user/

var express = require("express");
const { isSignedIn, isVerified, isDoctor } = require("../middleware");
var {
  getOwnDetails,
  editOwnDetails,
  getMedicalHistory,
  addMedicalRecord,
  removeMedicalRecord,
} = require("../services/userDetails");
var { historyStore } = require("../config/multerStore");

var userRouter = express.Router();

// get own details
userRouter.get("/me", isSignedIn, isVerified, getOwnDetails);
// edit own details
userRouter.put("/me", isSignedIn, isVerified, editOwnDetails);
// get medical history of a patient
userRouter.get("/medical/:userId", isSignedIn, isDoctor, getMedicalHistory);
// add medical history to patient's profile
userRouter.put(
  "/medical/:userId",
  isSignedIn,
  isDoctor,
  historyStore.single("medical"),
  addMedicalRecord
);
// remove a medical record with pid
userRouter.delete(
  "/medical/:userId",
  isSignedIn,
  isDoctor,
  removeMedicalRecord
);

module.exports = userRouter;
