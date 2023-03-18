var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

var Doctor = new Schema(
  {
    licId: {
      // doctor's license id
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    prevPatients: [{ type: String }],
    salt: {
      type: String,
    },
    encry_password: {
      type: String,
    },
  },
  { timestamps: true }
);

Doctor.virtual("password").set(function (password) {
  this._password = password;
  this.salt = crypto.randomBytes(50).toString("hex");
  this.encry_password = this.securePassword(password);
});

Doctor.methods = {
  authenticate: function (password) {
    return this.securePassword(password) === this.encry_password;
  },

  securePassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("Doctor", Doctor);
