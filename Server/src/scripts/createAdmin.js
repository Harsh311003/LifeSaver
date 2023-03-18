var { mongodb } = require("../config/keys");
var prompt = require("prompt-sync")();
var MongoClient = require("mongoose").mongo.MongoClient;

const usrname = prompt("Enter Username : ");
const password = prompt("Enter Password : ");

const url = mongodb.dbURI;

MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, db) => {
    if (err) {
      console.log(err);
      return;
    }

    var dbo = db.db("hack36");
    var adminObj = { username: usrname, password: password };
    dbo.collection("admin").findOne({ username: usrname }, (err, usr) => {
      if (err) throw err;
      if (usr) {
        console.log("Admin already exists!");
        db.close();
        return;
      }

      dbo.collection("admin").insertOne(adminObj, (err, res) => {
        if (err) throw err;
        console.log(usrname + " --- Admin Account Registered!");
        db.close();
      });
    });
  }
);
