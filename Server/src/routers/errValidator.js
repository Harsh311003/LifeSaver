var { validationResult } = require("express-validator");

// handling errors thrown by express validator
exports.errHandler = (req, res, next) => {
  const errors = validationResult(req).array();

  // checking for errors
  if (errors.length !== 0) {
    return res.status(400).json({
      error: errors[0].msg,
      location: errors[0].param,
      success: false,
    });
  }

  next();
};
