var Driver = require("../models/driver");

exports.getDriverOwnDetails = (req, res) => {
  const data = req.root._doc; // extracting data after middleware store
  return res.status(200).json({
    name: data.name,
    adhaar: data.adhaar,
    dLicId: data.dLicId,
    phone: data.phone,
  });
};

exports.editDriverDetails = (req, res) => {
  var drid =
    req.params.driverId !== undefined ? req.params.driverId : req.root._doc._id;
  const { name, adhaar, dLicId, phone } = req.body;
  Driver.findById(drid).then((driver) => {
    if (name !== undefined) driver.name = name;
    if (adhaar !== undefined) driver.adhaar = adhaar;
    if (dLicId !== undefined) driver.dLicId = dLicId;
    if (phone !== undefined) driver.phone = phone;

    driver
      .save()
      .then((savedDriver) => {
        return res.status(200).json({ msg: "Driver Updated!", success: true });
      })
      .catch((err) => {
        return res.status(502).json({ error: err, success: false });
      });
  });
};

exports.getAllDrivers = (req, res) => {
  Driver.find({}).then((drivers) => {
    return res.status(200).json(drivers.map((d) => d.transform()));
  });
};

// getting driver details by admin
exports.getDriverDetails = (req, res) => {
  Driver.findById(req.params.driverId)
    .then((driver) => {
      if (!driver) {
        return res
          .status(404)
          .json({ error: "Driver not found!", success: false });
      } else {
        return res.status(200).json({ driver: driver, success: true });
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};

exports.deleteDriver = (req, res) => {
  Driver.findByIdAndDelete(req.params.driverId)
    .then((driver) => {
      if (!driver) {
        return res
          .status(404)
          .json({ error: "Driver not found!", success: false });
      } else {
        return res.status(200).json({ msg: "Driver Deleted", success: true });
      }
    })
    .catch((err) => {
      return res.status(502).json({ error: err, success: false });
    });
};
