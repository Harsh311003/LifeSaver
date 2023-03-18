const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diseaseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

diseaseSchema.method("transform", function () {
  let obj = this.toObject();
  obj.id = obj._id;
  return obj;
});

module.exports = mongoose.model("Disease", diseaseSchema);
