var express = require("express");
var { isSignedIn, isDriver, isAdmin } = require("../middleware");
var {
  getDoctorOwnDetails,
  getDoctorDetails,
  getAllDoctors,
  editDoctorDetails,
  deleteDoctor,
} = require("../services/docDetails");

var docRouter = express.Router();

// getting own details driver
docRouter.get("/me", isSignedIn, isDriver, getDoctorOwnDetails);
// editting own details driver
docRouter.put("/me", isSignedIn, isDriver, editDoctorDetails);
// get all drivers
docRouter.get("/", isSignedIn, isAdmin, getAllDoctors);
// getting driver details
docRouter.get("/:doctorId", isSignedIn, isAdmin, getDoctorDetails);
// editting details by admin
docRouter.put("/:doctorId", isSignedIn, isAdmin, editDoctorDetails);
// deleting user by admin
docRouter.delete("/:doctorId", isSignedIn, isAdmin, deleteDoctor);

module.exports = docRouter;
