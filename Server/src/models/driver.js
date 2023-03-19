var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

var Driver = new Schema(
  {
    adhaar: {
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
    dLicId: {
      type: String,
    },
    salt: {
      type: String,
    },
    encry_password: {
      type: String,
    },
  },
  { timestamps: true }
);

Driver.virtual("password").set(function (password) {
  this._password = password;
  this.salt = crypto.randomBytes(50).toString("hex");
  this.encry_password = this.securePassword(password);
});

Driver.methods = {
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
  transform: function () {
    let obj = this.toObject();
    obj.id = obj._id;
    return obj;
  },
};

module.exports = mongoose.model("Driver", Driver);
