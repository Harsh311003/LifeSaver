require("dotenv").config();
require("./config/db");

var express = require("express");
var http = require("http");
var path = require("path");
var cors = require("cors");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var LocalPassportSetup = require("./config/passport-local");
var { socketServer } = require("./socket/io");

// importing routers
var authRouter = require("./routers/auth");
var userRouter = require("./routers/user");
var driverRouter = require("./routers/driver");
var docRouter = require("./routers/doc");
var ambulanceRouter = require("./routers/ambulanceRouter");
var ambulanceRouter = require("./routers/ambulanceRouter");
const diseaseRouter = require("./routers/diseaseRouter");

var corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  optionsSuccessStatus: 200, // some legacy borwsers choke on 204 (IE11 & various SmartTVs)
};

// creating express server
var app = express();

// middlewares
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "../public")));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/driver", driverRouter);
app.use("/doc", docRouter);
app.use("/ambulance", ambulanceRouter);
app.use("/disease", diseaseRouter);

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

const server = http.createServer(app);
var PORT = process.env.PORT || 8000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
socketServer(io);

server.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
