require("dotenv").config();

var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");

// creating express server
var app = express();
const server = http.createServer(app);
var PORT = process.env.PORT || 8000;

// middlewares
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "../public")));

// Catching 404 Not Found Error
app.use(function (req, res, next) {
  res.status(404);
  return res.json({
    error: `${req.method} on ${req.url} not found!!`,
    success: false,
  });
});

// Catching 500 Internal Server Error
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message,
    success: false,
  });
});

server.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
