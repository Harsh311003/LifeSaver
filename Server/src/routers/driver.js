var express = require("express");
var { isSignedIn, isDriver, isAdmin } = require("../middleware");
var {
  getDriverOwnDetails,
  getDriverDetails,
  getAllDrivers,
  editDriverDetails,
  deleteDriver,
} = require("../services/driverDetails");

var driverRouter = express.Router();

// getting own details driver
driverRouter.get("/me", isSignedIn, isDriver, getDriverOwnDetails);
// editting own details driver
driverRouter.put("/me", isSignedIn, isDriver, editDriverDetails);
// get all drivers
driverRouter.get("/", isSignedIn, isAdmin, getAllDrivers);
// getting driver details
driverRouter.get("/:driverId", isSignedIn, isAdmin, getDriverDetails);
// editting details by admin
driverRouter.put("/:driverId", isSignedIn, isAdmin, editDriverDetails);
// deleting user by admin
driverRouter.delete("/:driverId", isSignedIn, isAdmin, deleteDriver);

module.exports = driverRouter;
