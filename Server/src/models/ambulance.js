const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema(
  {
    plateNo: {
      type: String,
      unique: true,
      required: true,
    },
    regNo: {
      type: String,
      unique: true,
      required: true,
    },
    chassisNo: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

ambulanceSchema.method("transform", function () {
  let obj = this.toObject();
  obj.id = obj._id;
  return obj;
});

module.exports = mongoose.model("Ambulance", ambulanceSchema);
