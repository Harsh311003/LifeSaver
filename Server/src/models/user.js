var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

var User = new Schema(
  {
    name: {
      type: String,
    },
    adhaar: {
      type: String,
      unique: true,
      length: 12,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    addr: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    dob: {
      type: String,
    },
    bloodGrp: {
      type: String,
    },
    medHist: [
      {
        pid: Number,
        date: Date,
        docId: String,
        desc: String,
      },
    ],
    salt: {
      type: String,
    },
    encry_password: {
      type: String,
    },
  },
  { timestamps: true }
);
// Timestamps to store createdAt & updatedAt fields to the document

// Virtual Function to run before saving an object into Database
User.virtual("password").set(function (password) {
  this._password = password;
  this.salt = crypto.randomBytes(50).toString("hex");
  this.encry_password = this.securePassword(password);
});

User.methods = {
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

module.exports = mongoose.model("User", User);
