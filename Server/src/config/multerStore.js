var multer = require("multer");
var path = require("path");
var crypto = require("crypto");

// store for storing medical history of user
exports.historyStore = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/medical");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        // choosing filename
        crypto.randomBytes(10).toString("hex") + path.extname(file.originalname)
      );
    },
  }),
  // check only allowing pdfs, jpgs and jpegs
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf")
      return cb(new Error("Only jpgs & pdfs allowed!!"));
    cb(null, true);
  },
});
