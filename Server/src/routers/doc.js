var express = require("express");
var { isSignedIn, isAdmin, isDoctor } = require("../middleware");
var {
  getDoctorOwnDetails,
  getDoctorDetails,
  getAllDoctors,
  editDoctorDetails,
  deleteDoctor,
} = require("../services/docDetails");

var docRouter = express.Router();

// getting own details doctor
docRouter.get("/me", isSignedIn, isDoctor, getDoctorOwnDetails);
// editting own details doctor
docRouter.put("/me", isSignedIn, isDoctor, editDoctorDetails);
// get all doctors
docRouter.get("/", isSignedIn, isAdmin, getAllDoctors);
// getting doctors details
docRouter.get("/:doctorId", isSignedIn, isAdmin, getDoctorDetails);
// editting details by admin
docRouter.put("/:doctorId", isSignedIn, isAdmin, editDoctorDetails);
// deleting user by admin
docRouter.delete("/:doctorId", isSignedIn, isAdmin, deleteDoctor);

module.exports = docRouter;
