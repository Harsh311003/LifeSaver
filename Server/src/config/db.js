var mongoose = require("mongoose");
var { mongodb } = require("./keys");

const connectDB = mongoose.connect(mongodb.dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// handling promise object from connection request
connectDB.then(
  (db) => {
    console.log("Connected To Database!!");
    return db;
  },
  (err) => console.log(err)
);

module.exports = connectDB;
